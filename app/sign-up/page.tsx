import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Pebbling AI",
  description: "Create your Pebbling AI account",
};

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join Pebbling AI to get started
          </p>
        </div>
        <div className="mt-8">
          <SignUp 
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
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
