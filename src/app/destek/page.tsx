import type { Metadata } from "next";
import { SupportPage } from "@/components/support/SupportPage";

export const metadata: Metadata = {
  title: "Destek",
};

export default function Page() {
  return <SupportPage />;
}
