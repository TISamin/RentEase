import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  MapPin,
  Phone,
  PlusCircle,
  Tag,
  Type,
  X,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateListing } from "../hooks/useBackend";
import { ALL_CATEGORIES, CATEGORY_LABELS, Category } from "../types";

interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  progress: number;
  status: "uploading" | "done" | "error";
  imageKey: string;
}

function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s\-().]{7,20}$/.test(phone.trim());
}

function FieldWrapper({
  id,
  label,
  required,
  error,
  errorId,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="flex items-center gap-1.5 font-medium">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p
          id={errorId}
          className="text-xs text-destructive flex items-center gap-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function PostListing() {
  const navigate = useNavigate();
  const { mutateAsync: createListing, isPending } = useCreateListing();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>(ALL_CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploadingAny, setIsUploadingAny] = useState(false);
  
  const [roommatesNeeded, setRoommatesNeeded] = useState("1");
  const [roommatesGot, setRoommatesGot] = useState("0");

  const isRoommateFinder = category === Category.roommate_finder;
  const nameLabel = isRoommateFinder ? "Headline" : "Listing Name";
  const descLabel = isRoommateFinder ? "Details & Requirements" : "Description";

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Listing name is required";
    if (!description.trim()) e.description = "Description is required";
    if (!location.trim()) e.location = "Location is required";
    if (!contactPhone.trim()) {
      e.contactPhone = "Contact phone is required";
    } else if (!isValidPhone(contactPhone)) {
      e.contactPhone = "Enter a valid phone number (e.g. +880 1XXX-XXXXXX)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function clearFieldError(field: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (newFiles.length === 0) {
      toast.error("Please select valid image files (JPG, PNG, WebP, etc.)");
      return;
    }

    setIsUploadingAny(true);
    const timestamp = Date.now();
    const newImages: UploadedImage[] = newFiles.map((file, idx) => ({
      id: `${file.name}-${timestamp}-${idx}`,
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: "uploading" as const,
      imageKey: "",
    }));

    setImages((prev) => [...prev, ...newImages]);

    const updatedImages = await Promise.all(
      newImages.map(async (img) => {
        try {
          await new Promise<void>((resolve) => {
            let pct = 0;
            const interval = setInterval(() => {
              pct += Math.random() * 30 + 10;
              if (pct >= 100) {
                pct = 100;
                clearInterval(interval);
                resolve();
              }
              setImages((prev) =>
                prev.map((i) =>
                  i.id === img.id ? { ...i, progress: Math.min(pct, 100) } : i,
                ),
              );
            }, 120);
          });

          const imageKey = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(img.file);
          });

          setImages((prev) =>
            prev.map((i) =>
              i.id === img.id
                ? { ...i, status: "done", progress: 100, imageKey }
                : i,
            ),
          );
          return { ...img, status: "done" as const, progress: 100, imageKey };
        } catch {
          setImages((prev) =>
            prev.map((i) =>
              i.id === img.id ? { ...i, status: "error", progress: 0 } : i,
            ),
          );
          return { ...img, status: "error" as const };
        }
      }),
    );

    if (updatedImages.some((i) => i.status === "error")) {
      toast.error("Some images failed to process. Please try again.");
    }
    setIsUploadingAny(false);
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (isUploadingAny) {
      toast.error("Please wait for images to finish uploading.");
      return;
    }

    const doneImageKeys = images
      .filter((i) => i.status === "done")
      .map((i) => i.imageKey);

    let metadataObj: Record<string, any> | null = null;
    if (isRoommateFinder) {
      metadataObj = {
        roommatesNeeded: parseInt(roommatesNeeded) || 1,
        roommatesGot: parseInt(roommatesGot) || 0,
      };
    }

    try {
      const listing = await createListing({
        name: name.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        contactPhone: contactPhone.trim(),
        imageKeys: doneImageKeys,
        metadata: metadataObj ? JSON.stringify(metadataObj) : null,
      });
      toast.success("Listing posted successfully!");
      navigate({ to: "/listings/$id", params: { id: listing.id.toString() } });
    } catch {
      toast.error("Failed to post listing. Please try again.");
    }
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="post_listing.page">
      <div className="bg-card border-b border-border px-4 sm:px-6 py-6">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Post a Listing
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Share your property or service with thousands of potential clients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-7"
            >
              {/* Category */}
              <FieldWrapper
                id="listing-category"
                label="Category"
                required
                icon={Tag}
              >
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as Category)}
                >
                  <SelectTrigger
                    id="listing-category"
                    data-ocid="post_listing.category.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldWrapper>

              {/* Name */}
              <FieldWrapper
                id="listing-name"
                label={nameLabel}
                required
                error={errors.name}
                errorId="name-error"
                icon={Type}
              >
                <Input
                  id="listing-name"
                  placeholder="e.g. Spacious 2-bedroom flat in Gulshan"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) clearFieldError("name");
                  }}
                  onBlur={() =>
                    !name.trim() &&
                    setErrors((er) => ({
                      ...er,
                      name: "Listing name is required",
                    }))
                  }
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  data-ocid="post_listing.name.input"
                />
              </FieldWrapper>

              {/* Location */}
              <FieldWrapper
                id="listing-location"
                label="Location"
                required
                error={errors.location}
                errorId="location-error"
                icon={MapPin}
              >
                <Input
                  id="listing-location"
                  placeholder="e.g. Gulshan-2, Dhaka"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) clearFieldError("location");
                  }}
                  onBlur={() =>
                    !location.trim() &&
                    setErrors((er) => ({
                      ...er,
                      location: "Location is required",
                    }))
                  }
                  aria-invalid={!!errors.location}
                  aria-describedby={
                    errors.location ? "location-error" : undefined
                  }
                  data-ocid="post_listing.location.input"
                />
              </FieldWrapper>

              {/* Description */}
              <FieldWrapper
                id="listing-description"
                label={descLabel}
                required
                error={errors.description}
                errorId="desc-error"
                icon={Type}
              >
                <Textarea
                  id="listing-description"
                  placeholder="Describe your property — size, amenities, special features, nearby landmarks…"
                  rows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) clearFieldError("description");
                  }}
                  onBlur={() =>
                    !description.trim() &&
                    setErrors((er) => ({
                      ...er,
                      description: "Description is required",
                    }))
                  }
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "desc-error" : undefined
                  }
                  data-ocid="post_listing.description.textarea"
                  className="resize-y"
                />
              </FieldWrapper>

              {/* Contact Phone */}
              <FieldWrapper
                id="listing-phone"
                label="Contact Phone"
                required
                error={errors.contactPhone}
                errorId="phone-error"
                icon={Phone}
              >
                <Input
                  id="listing-phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={contactPhone}
                  onChange={(e) => {
                    setContactPhone(e.target.value);
                    if (errors.contactPhone) clearFieldError("contactPhone");
                  }}
                  onBlur={() => {
                    if (!contactPhone.trim()) {
                      setErrors((er) => ({
                        ...er,
                        contactPhone: "Contact phone is required",
                      }));
                    } else if (!isValidPhone(contactPhone)) {
                      setErrors((er) => ({
                        ...er,
                        contactPhone:
                          "Enter a valid phone number (e.g. +880 1XXX-XXXXXX)",
                      }));
                    }
                  }}
                  aria-invalid={!!errors.contactPhone}
                  aria-describedby={
                    errors.contactPhone ? "phone-error" : undefined
                  }
                  data-ocid="post_listing.contact_phone.input"
                />
              </FieldWrapper>

              {isRoommateFinder && (
                <div className="grid grid-cols-2 gap-4">
                  <FieldWrapper
                    id="roommates-needed"
                    label="Roommates Needed"
                    required
                    icon={Users}
                  >
                    <Input
                      id="roommates-needed"
                      type="number"
                      min="1"
                      value={roommatesNeeded}
                      onChange={(e) => setRoommatesNeeded(e.target.value)}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    id="roommates-got"
                    label="Current Roommates"
                    required
                    icon={Users}
                  >
                    <Input
                      id="roommates-got"
                      type="number"
                      min="0"
                      value={roommatesGot}
                      onChange={(e) => setRoommatesGot(e.target.value)}
                    />
                  </FieldWrapper>
                </div>
              )}

              {/* Images Upload */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 font-medium">
                    <ImagePlus className="h-3.5 w-3.5 text-muted-foreground" />
                    Photos
                    <span className="text-muted-foreground font-normal text-xs ml-1">
                      (optional)
                    </span>
                  </Label>
                  {images.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {images.filter((i) => i.status === "done").length} of{" "}
                      {images.length} ready
                    </span>
                  )}
                </div>

                {/* Drop zone / upload trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-smooth hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Select images to upload"
                  data-ocid="post_listing.image_upload.dropzone"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Click to add photos
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      JPG, PNG, WebP up to 10MB each — multiple files OK
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    data-ocid="post_listing.image_file.input"
                  />
                </button>

                {/* Image Thumbnails */}
                {images.length > 0 && (
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    data-ocid="post_listing.images.list"
                  >
                    {images.map((img, i) => (
                      <div
                        key={img.id}
                        className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-square"
                        data-ocid={`post_listing.image.item.${i + 1}`}
                      >
                        <img
                          src={img.previewUrl}
                          alt={`Upload preview ${i + 1}`}
                          className="h-full w-full object-cover"
                        />

                        {img.status === "uploading" && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 gap-2 px-3">
                            <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            <Progress
                              value={img.progress}
                              className="h-1.5 w-full"
                            />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(img.progress)}%
                            </span>
                          </div>
                        )}

                        {img.status === "done" && (
                          <div className="absolute top-1.5 left-1.5">
                            <CheckCircle2 className="h-5 w-5 text-accent drop-shadow-sm" />
                          </div>
                        )}

                        {img.status === "error" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-destructive/20">
                            <Badge
                              variant="destructive"
                              className="text-xs px-1.5 py-0.5"
                            >
                              Failed
                            </Badge>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          aria-label={`Remove image ${i + 1}`}
                          className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-foreground shadow opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                          data-ocid={`post_listing.remove_image.delete_button.${i + 1}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border bg-muted/20 aspect-square text-muted-foreground transition-smooth hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Add more images"
                      data-ocid="post_listing.add_more_images.button"
                    >
                      <PlusCircle className="h-5 w-5" />
                      <span className="text-xs font-medium">Add more</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 border-t border-border">
                <Button
                  type="submit"
                  disabled={isPending || isUploadingAny}
                  size="lg"
                  className="w-full gap-2"
                  data-ocid="post_listing.submit.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Posting…
                    </>
                  ) : isUploadingAny ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading images…
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-5 w-5" />
                      Post Listing
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Fields marked with{" "}
                  <span className="text-destructive font-semibold">*</span> are
                  required. Your listing goes live immediately.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
