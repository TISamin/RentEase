import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthStore } from "../hooks/useAuth";
import { Mail, KeyRound, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

export function LoginModal() {
  const open = useAuthStore((s) => s.loginModalOpen);
  const setOpen = useAuthStore((s) => s.setLoginModalOpen);
  
  const sendOtp = useAuthStore((s) => s.sendOtp);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const setPassword = useAuthStore((s) => s.setPassword);
  const loginWithPassword = useAuthStore((s) => s.loginWithPassword);
  
  const isLoading = useAuthStore((s) => s.isLoading);

  const [mode, setMode] = useState<"login" | "signup" | "forgot_password">("login");
  const [signupStep, setSignupStep] = useState<"email" | "otp" | "password">("email");
  
  const [email, setEmail] = useState("");
  const [password, setPasswordState] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const success = await loginWithPassword(email, password);
    if (success) {
      toast.success("Logged in successfully!");
      resetState();
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    const success = await sendOtp(email);
    if (success) {
      setSignupStep("otp");
      toast.success("Verification code sent!");
    } else {
      toast.error("Failed to send email. Check backend configuration.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    
    const success = await verifyOtp(email, otp);
    if (success) {
      toast.success("Email verified! Please set a password.");
      setSignupStep("password");
    } else {
      toast.error("Invalid or expired verification code.");
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    
    const success = await setPassword(email, password);
    if (success) {
      toast.success(mode === "forgot_password" ? "Password reset successfully! You are now logged in." : "Signup complete! You are now logged in.");
      resetState();
    } else {
      toast.error(mode === "forgot_password" ? "Failed to reset password." : "Failed to complete signup.");
    }
  };

  const resetState = () => {
    setTimeout(() => {
      setMode("login");
      setSignupStep("email");
      setEmail("");
      setPasswordState("");
      setOtp("");
    }, 500);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setMode("login");
      setSignupStep("email");
      setPasswordState("");
      setOtp("");
    }
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {mode === "login" 
              ? "Welcome Back" 
              : mode === "forgot_password"
                ? signupStep === "email" 
                  ? "Reset Password" 
                  : signupStep === "otp" 
                    ? "Verify Email" 
                    : "Set New Password"
                : signupStep === "email" 
                  ? "Create an Account" 
                  : signupStep === "otp" 
                    ? "Verify Email" 
                    : "Set a Password"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Enter your email and password to log in."
              : mode === "forgot_password"
                ? signupStep === "email"
                  ? "Enter your email and we'll send you a code to reset your password."
                  : signupStep === "otp"
                    ? `We sent a 6-digit code to ${email}`
                    : "Create a new password for your account."
                : signupStep === "email"
                  ? "We'll send you a verification code to get started."
                  : signupStep === "otp"
                    ? `We sent a 6-digit code to ${email}`
                    : "Create a password to complete your account."}
          </DialogDescription>
        </DialogHeader>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  onClick={() => { setMode("forgot_password"); setSignupStep("email"); setPasswordState(""); }}
                  className="text-xs text-primary hover:underline font-medium focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPasswordState(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">Don't have an account? </span>
              <button 
                type="button" 
                onClick={() => { setMode("signup"); setSignupStep("email"); setPasswordState(""); }}
                className="text-sm font-medium hover:underline text-primary"
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-4">
            {signupStep === "email" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !email.includes("@")}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Verification Code"}
                </Button>
              </form>
            )}

            {signupStep === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-3 flex flex-col items-center">
                  <Label htmlFor="otp" className="flex items-center gap-1.5 self-start">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    One-Time Password
                  </Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus disabled={isLoading}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full" disabled={otp.length !== 6 || isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Verify Code"}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full text-xs" onClick={() => setSignupStep("email")}>
                    Use a different email
                  </Button>
                </div>
              </form>
            )}

            {signupStep === "password" && (
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Create Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPasswordState(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || password.length < 6}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "forgot_password" ? "Reset Password" : "Complete Signup"}
                </Button>
              </form>
            )}

            {signupStep === "email" && (
              <div className="text-center mt-6">
                <span className="text-sm text-muted-foreground">
                  {mode === "forgot_password" ? "Remember your password? " : "Already have an account? "}
                </span>
                <button 
                  type="button" 
                  onClick={() => setMode("login")}
                  className="text-sm font-medium hover:underline text-primary"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
