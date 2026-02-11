import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <header className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Organize your thoughts with <span className="text-blue-600">Dev-Notes</span>
        </h1>
        <p className="text-lg text-gray-600">
          A secure, fast, and minimal way to store your developer notes.
          Built with Next.js, MongoDB, and JWT.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="w-full rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700 sm:w-auto"
          >
            Get Started for Free
          </Link>
          <Link
            href="/login"
            className="w-full rounded-full border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
          >
            Log in to your account
          </Link>
        </div>
      </header>

      <footer className="absolute bottom-8 text-sm text-gray-400">
        © 2024 Dev-Notes. All rights reserved.
      </footer>
    </div>
  );
}