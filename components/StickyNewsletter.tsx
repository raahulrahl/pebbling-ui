"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyNewsletter() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
      
      // Close the newsletter after success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      
    } catch {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const closeNewsletter = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm p-3 border-t border-border shadow-lg"
        >
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-foreground">
              <Mail className="h-4 w-4 text-purple-400" />
              <h3 className="text-xs sm:text-sm font-medium">Join our newsletter</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-1 max-w-xs space-x-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-8 px-3 py-1 text-xs bg-background text-foreground placeholder:text-muted-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
              <Button 
                type="submit"
                size="sm"
                disabled={status === "loading"}
                className="h-8 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </Button>
            </form>
            
            {status !== "idle" && (
              <p className={`text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
            
            <button
              onClick={closeNewsletter}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close newsletter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
