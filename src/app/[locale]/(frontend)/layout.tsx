import { Footer } from "@/frontend/shared/footer";
import { Header } from "@/frontend/shared/header";
import { Top } from "@/frontend/shared/top";
import type { PropsWithChildren } from "react";
export const runtime = 'edge';

export default function FrontendLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-5">
        {children}
      </main>
      <Footer />
      <Top />
    </>
  );
}
