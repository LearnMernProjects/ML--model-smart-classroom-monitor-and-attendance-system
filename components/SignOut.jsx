"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleSignOut}
        className="signoutbutton px-7 py-7 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        Sign Out
      </button>
    </div>
  );
}
