import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Learning from "@/components/sections/comunity";
import Courses from "@/components/sections/courses";
import Tools from "@/components/sections/tools";
import Invite from "@/components/sections/invite";
import Advantages from "@/components/sections/advantages";
import Bundles from "@/components/sections/bundles";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
      <main>
        <Header />
        <Hero />
        <Learning />
        <Courses />
        <Tools />
        <Invite />
        <Advantages />
        <Bundles />
        <Footer />
      </main>
  );
}