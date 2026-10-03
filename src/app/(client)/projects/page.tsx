import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";

export const metadata = {
  title: "All Projects | Dharani Dharan",
  description: "Explore all digital products and experiences I have designed and developed.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
