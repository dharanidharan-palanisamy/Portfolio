import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow pt-32 flex items-center justify-center">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
