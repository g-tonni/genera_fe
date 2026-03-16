import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import FooterDesktop from "./FooterDesktop";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

function DiscoverPage() {
  const [section, setSection] = useState("generative");

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="w-full pb-15 bg-black pt-60 md:pt-40 lg:pt-30 xl:pt-20 overflow-x-hidden">
        {/*  BOTTONI SEZIONI */}
        {/* BOX PER LINEA */}
        <div className="border-b-2 border-gray-50/20">
          {/* BOX PER SCROLL */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* BOX PER BOTTONI */}
            <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex text-gray-50">
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === "generative" ? "bg-gray-50/20 border-b-2 " : "bg-transparent"} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection("generative");
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Generative
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === "interactive" ? "bg-gray-50/20 border-b-2 " : "bg-transparent"} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection("interactive");
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Interactive
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === "spatials" ? "bg-gray-50/20 border-b-2 " : "bg-transparent"} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection("spatials");
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Spatials
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === "patterns" ? "bg-gray-50/20 border-b-2 " : "bg-transparent"} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection("patterns");
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Patterns
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === "particles" ? "bg-gray-50/20 border-b-2 " : "bg-transparent"} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection("particles");
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Particles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEZIONI */}
      </div>
      <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bg-black text-gray-50">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </>
  );
}

export default DiscoverPage;
