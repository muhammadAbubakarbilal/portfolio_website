import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Blog } from "@/components/Blog";
import Contact from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Contact />
      <Chatbot />
      <Footer />
    </>
  );
}
