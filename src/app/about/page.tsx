"use client";
import { Rocket, Film, Users, Award, Heart } from "lucide-react";
import Image from "next/image";
import TeamCard from "@/components/TeamCard";

export default function AboutPage() {
  const stats = [
    {
      value: "5K+",
      label: "Happy Subscribers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "10K+",
      label: "Hours of Content",
      icon: <Film className="w-6 h-6" />,
    },
    {
      value: "2025",
      label: "Founded In",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      value: "24/7",
      label: "Customer Support",
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  const teamMembers = [
    { name: "Saurav Joshi", role: "CEO & Founder", image: "/team/alex.jpg" },
    {
      name: "Saad Mehmood",
      role: "Content Director",
      image: "/team/sarah.jpg",
    },
    { name: "Kamlesh Kumar", role: "Tech Lead", image: "/team/marcus.jpg" },
  ];

  return (
    <main
      className="min-h-screen text-white bg-linear-to-b from-[#0D071A] to-[#1A0C3D]"
      style={{
        backgroundImage: `
      url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%235d32a1' fill-opacity='0.29' fill-rule='evenodd'/%3E%3C/svg%3E")
    `,
        backgroundBlendMode: "overlay",
      }}
    >
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: `
   background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      `,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            About PrimeFlix
          </h1>
          <p className="text-xl md:text-2xl text-[#B4ACD9] max-w-3xl mx-auto leading-relaxed">
            Revolutionizing entertainment through innovation, quality, and an
            unwavering commitment to our audience.
          </p>
        </div>
      </section>
      <section
        className="py-16 px-6 bg-[#160A25]/50 backdrop-blur-sm"
        style={{
          background: `
   background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      `,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <Rocket className="text-[#A92EDF] mr-3 w-8 h-8" />
              <h2 className="text-3xl font-bold">Our Story</h2>
            </div>
            <p className="text-lg text-[#B4ACD9] mb-6 leading-relaxed">
              Founded in 2025, <strong className="text-white">PrimeFlix</strong>{" "}
              began with a vision to revolutionize the way people consume media.
              We've grown into a trusted platform known for quality and
              innovation.
            </p>
            <p className="text-lg text-[#B4ACD9] leading-relaxed">
              Our passionate team works tirelessly to curate content that
              resonates with viewers while pushing boundaries in streaming
              technology.
            </p>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#2A1E3A] shadow-lg">
            <Image
              src="/team.jpg"
              alt="PrimeFlix team working"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      <section
        className="py-16 px-6 bg-linear-to-r from-[#1E1433] to-[#160A25]"
        style={{
          background: `
   background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      `,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#1E1433] p-6 rounded-xl border border-[#2A1E3A] text-center hover:bg-[#2A1E3A] transition-all"
              >
                <div className="text-[#A92EDF] flex justify-center mb-3">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-[#B4ACD9]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-16 px-6"
        style={{
          background: `
   background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      `,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Users className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-3xl font-bold">Meet The Team</h2>
          </div>
          <p className="text-lg text-[#B4ACD9] max-w-3xl mb-12 leading-relaxed">
            Our diverse team of industry experts is dedicated to delivering
            exceptional entertainment experiences.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-20 px-6 bg-linear-to-br from-[#1A0C3D] to-[#0D071A]"
        style={{
          background: `
   background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      `,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Award className="mx-auto text-[#A92EDF] w-12 h-12 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-[#B4ACD9] mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the PrimeFlix difference - where innovation meets
            entertainment. Get Best Subscriptions today.
          </p>
          <button className="bg-linear-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 cursor-pointer text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-[#A92EDF]/20">
            Explore
          </button>
        </div>
      </section>
    </main>
  );
}


