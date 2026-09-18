import type { Metadata } from "next";
import { PlayPage } from "@/components/play/PlayPage";

export const metadata: Metadata = {
  title: "Ücretsiz Oyna",
};

export default function Page() {
  return <PlayPage />;
}
