"use client";
import React from "react";
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
const SocialLink = () => {
  const emailUser = "mehmoodsaad347";
  const emailDomain = "gmail.com";

  const email = `${emailUser}@${emailDomain}`;
  const whatsappNumber = "9773834796";
  const defaultMessage = "Hello, I have a question about...";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage,
  )}`;
  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/saad-mehmood-4a6036255/",
      label: "Linkedin",
      color: "hover:text-blue-500",
      bg: "hover:bg-red-blue/10",
    },
    {
      icon: Github,
      url: "https://github.com/Saadmehmood1234",
      label: "Github",
      color: "hover:text-gray-400",
      bg: "hover:bg-gray-400/10",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/saadmehmood030",
      label: "Instagram",
      color: "hover:text-pink-500",
      bg: "hover:bg-pink-500/10",
    },
    {
      icon: FaWhatsapp,
      url: whatsappUrl,
      label: "Whatsapp",
      color: "hover:text-green-500",
      bg: "hover:bg-green-500/10",
    },
    {
      icon: FaEnvelope,
      url: `mailto:${email}`,
      label: "Email",
      color: "hover:text-[#932AD2]",
      bg: "hover:bg-[#932AD2]/10",
    },
  ];

  return (
    <div className="flex space-x-3">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${social.label}`}
          className={`p-2 rounded-lg bg-[#1E1433] text-gray-400 ${social.color} ${social.bg} transition-all duration-300`}
        >
          <social.icon className="size-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLink;
