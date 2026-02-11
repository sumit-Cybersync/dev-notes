"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-sans">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white dark:bg-zinc-900 p-8 shadow-2xl shadow-zinc-200 dark:shadow-none border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Create Account</h2>
                    <p className="mt-2 text-sm text-zinc-500">Join Dev-Notes and start organizing</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-center">
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                required
                                className="w-full rounded-xl border-none bg-zinc-100 dark:bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                required
                                className="w-full rounded-xl border-none bg-zinc-100 dark:bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border-none bg-zinc-100 dark:bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 p-4 font-bold text-white shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 mt-4 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {loading ? "Creating Account..." : "Get Started"}
                    </button>
                </form>
                <p className="text-center text-sm text-zinc-500">
                    Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}