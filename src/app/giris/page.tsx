import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Giriş",
};

export default function Page() {
  return <LoginPage />;
}
