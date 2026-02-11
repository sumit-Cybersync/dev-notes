import { getUserFromToken } from "@/app/libs/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserFromToken();

    if (!user) {
        redirect("/login");
    }

    return <>{children}</>;
}
