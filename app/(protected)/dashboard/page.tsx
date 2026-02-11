"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch("/api/notes");
            if (res.ok) {
                const data = await res.json();
                setNotes(data);
            }
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
    };

    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote),
            });
            if (res.ok) {
                setNewNote({ title: "", content: "" });
                setShowModal(false);
                fetchNotes();
            }
        } catch (error) {
            console.error("Failed to create note:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
            {/* Header */}
            <nav className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Dev-Notes
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="hidden sm:flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition shadow-sm"
                    >
                        <span>+</span> New Note
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Your Notes</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="sm:hidden bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg font-medium"
                    >
                        +
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                        <p className="text-zinc-500 mb-4 text-lg">You haven&apos;t created any notes yet.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Start by creating your first note
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 flex flex-col"
                            >
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                        {note.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm whitespace-pre-wrap line-clamp-4">
                                        {note.content}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* New Note Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">New Dev Note</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleCreateNote} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-zinc-500 uppercase tracking-wider text-[10px]">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="E.g. OAuth Flow implementation"
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={newNote.title}
                                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-zinc-500 uppercase tracking-wider text-[10px]">
                                        Content
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Brain dump your technical thoughts here..."
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                                        value={newNote.content}
                                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50 mt-4"
                                >
                                    {saving ? "Saving note..." : "Save Note"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
