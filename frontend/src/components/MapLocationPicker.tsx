import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Loader2, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import L from "leaflet";

// Fix default icon issue in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapLocationPickerProps {
  onLocationSelect: (location: string) => void;
}

function LocationMarker({ position, setPosition }: { position: any, setPosition: any }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export function MapLocationPicker({ onLocationSelect }: MapLocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.8103, 90.4125]); // Default Dhaka
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // use a map ref if we need to flyTo
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
          const data = await res.json();
          setSuggestions(data || []);
          setShowSuggestions(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const newPos = new L.LatLng(lat, lon);
        setPosition(newPos);
        setMapCenter([lat, lon]);
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lon], 14);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const newPos = new L.LatLng(lat, lon);
        setPosition(newPos);
        setMapCenter([lat, lon]);
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lon], 14);
        }
        setIsLocating(false);
      },
      (err) => {
        console.error(err);
        setIsLocating(false);
      }
    );
  };

  const handleConfirm = async () => {
    if (position) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
        const data = await res.json();
        if (data && data.display_name) {
          onLocationSelect(data.display_name);
        } else {
          onLocationSelect(`${position.lat}, ${position.lng}`);
        }
      } catch (e) {
        onLocationSelect(`${position.lat}, ${position.lng}`);
      }
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="gap-2 shrink-0">
          <MapPin className="h-4 w-4" />
          Pick on Map
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col p-4 sm:p-6" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input 
              placeholder="Search a place..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setShowSuggestions(false);
                  handleSearch();
                }
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-[1000] max-h-60 overflow-auto">
                {suggestions.map((s, i) => (
                  <li 
                    key={i} 
                    className="p-2 hover:bg-muted cursor-pointer text-sm text-foreground"
                    onClick={() => {
                      setSearchQuery(s.display_name);
                      setShowSuggestions(false);
                      const lat = parseFloat(s.lat);
                      const lon = parseFloat(s.lon);
                      const newPos = new L.LatLng(lat, lon);
                      setPosition(newPos);
                      setMapCenter([lat, lon]);
                      if (mapRef.current) {
                        mapRef.current.flyTo([lat, lon], 14);
                      }
                    }}
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="button" onClick={() => {
            setShowSuggestions(false);
            handleSearch();
          }} disabled={isSearching}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
          <Button type="button" variant="secondary" onClick={handleLocateMe} disabled={isLocating} title="Use my location">
            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 min-h-0 rounded-md overflow-hidden border relative z-0 mt-2">
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        <div className="flex justify-end gap-2 pt-4 mt-auto">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="button" onClick={handleConfirm} disabled={!position}>Confirm Location</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
