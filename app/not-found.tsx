"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-neutral-600 mb-6">
        Oops! This page could not be found.
      </p>
      <button
        onClick={() => router.push("/")}
        className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
