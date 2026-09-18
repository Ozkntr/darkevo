import type { Metadata } from "next";
import { WikiPage } from "@/components/wiki/WikiPage";

export const metadata: Metadata = {
  title: "Wiki",
};

export default function Page() {
  return <WikiPage />;
}
