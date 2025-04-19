import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Pebbling AI",
  description: "Sign in to your Pebbling AI account",
};

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back to Pebbling AI
          </p>
        </div>
        <div className="mt-8">
          <SignIn 
            appearance={{
              elements: {
                card: "bg-background border border-border shadow-lg",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background border-border text-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
                dividerText: "text-muted-foreground",
                socialButtonsIconButton: "border-border text-foreground",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
