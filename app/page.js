import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Learning from "@/components/sections/comunity";
import Courses from "@/components/sections/courses";
import Tools from "@/components/sections/tools";
import Invite from "@/components/sections/invite";
import Advantages from "@/components/sections/advantages";

export default function Home() {
  return (
      <main>
        <Header />
        <Hero />
        <Learning />
        <Courses />
        <Tools />
        <Invite />
        <Advantages/>
      </main>
  );
}