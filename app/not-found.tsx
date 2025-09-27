"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-neutral-600 mb-6">This page could not be found.</p>
      <button
        onClick={() => router.push("/")}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Back to Home
      </button>
    </div>
  );
}
