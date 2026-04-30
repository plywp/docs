import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 pt-8">
          <div className="max-w-fit mx-auto px-6 md:px-8 lg:px-12 ml-0 md:ml-8 w-screen">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
