"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RainbowButton } from "./RainbowButton";
import { Mail } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
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
      
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 text-orange-500">
            <Mail className="h-5 w-5" />
            <span className="font-medium">Newsletter</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Stay in the loop
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Subscribe to our newsletter to get the latest updates on Pebbling AI and agent-to-agent communication.
          </p>

          <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-md mt-4 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
              />
              <RainbowButton
                type="submit"
                className="h-11"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </RainbowButton>
            </div>
            
            {status === "success" && (
              <motion.p 
                className="text-green-600 dark:text-green-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {message}
              </motion.p>
            )}
            
            {status === "error" && (
              <motion.p 
                className="text-red-600 dark:text-red-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {message}
              </motion.p>
            )}
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
