import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile | Pebbling AI",
  description: "Manage your Pebbling AI account",
};

export default function UserProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Your Profile
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your Pebbling AI account settings
          </p>
        </div>
        <div className="mt-8">
          <UserProfile 
            appearance={{
              elements: {
                card: "bg-background border border-border shadow-lg",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background border-border text-foreground",
                dividerText: "text-muted-foreground",
                navbar: "bg-background text-foreground",
                navbarButton: "text-foreground",
                navbarButtonActive: "bg-primary/10 text-primary",
                profileSectionTitle: "text-foreground",
                profileSectionTitleText: "text-foreground",
                userPreviewMainIdentifier: "text-foreground",
                userPreviewSecondaryIdentifier: "text-muted-foreground",
              },
            }}
            routing="path"
            path="/user-profile"
          />
        </div>
      </div>
    </div>
  );
}
