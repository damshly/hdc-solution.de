import Hero from "@/components/home/Hero";
import Services from "@/components/home/HeroServices";
import Advantages from "@/components/home/Advantages";
import About from "@/components/home/HeroAbout";
import Gallery from "@/components/home/Gallery";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
      <Hero />
      <Services />
      <Advantages />
      <About />
      <Gallery />
    </main>
  );
}
