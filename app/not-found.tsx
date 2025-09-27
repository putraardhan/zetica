"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <button
        onClick={() => router.push("/")}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Go Home
      </button>
    </div>
  );
}
