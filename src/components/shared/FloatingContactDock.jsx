"use client";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export function FloatingContactDock() {
  const links = [
    {
      title: "Email Us",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:hello@vyoma.studio",
    },
    {
      title: "WhatsApp",
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://wa.me/yourwhatsappnumber",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com",
    },
  ];

  return (
    <div className="mt-6 flex items-center justify-start">
      <FloatingDock
        mobileClassName="translate-y-0"
        items={links}
      />
    </div>
  );
}

