"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";



const SideNav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navLinks = [
    {
      name: "Get Started",
      path: "/get-started",
      icon: {
        black: "/assets/globe-02.svg",
        white: "/assets/globe-01.svg",
      },
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: {
        black: "/assets/element-1.svg",
        white: "/assets/element-2.svg",
      },
    },
    {
      name: "Accounts",
      path: "/account",
      icon: {
        black: "/assets/empty-wallet.svg",
        white: "/assets/empty-wallet2.svg",
      },
    },
    {
      name: "Tranfers",
      path: "/transfers",
      icon: {
        black: "/assets/coins-swap-1.svg",
        white: "/assets/coins-swap-02.svg",
      },
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: {
        black: "/assets/document.svg",
        white: "/assets/document2.svg",
      },
    },
    {
      name: "Settings",
      path: "/settings",
      icon: {
        black: "/assets/setting-2.svg",
        white: "/assets/setting-1.svg",
      },
    },
  ];

  return (
    <div className=" hidden  lg:block lg:w-[263px] bg-white text-gray-950 h-[900px] py-5">
      <nav>
        <ul className="">
          {navLinks.map((link) => (
            <li key={link.path} className="">
              <Link
                href={link.path}
                className={`flex items-center p-2 transition-colors duration-300 px-6 text-sm ${
                  pathname === link.path
                    ? "bg-blue-600 py-4 focus:text-white"
                    : "hover:bg-blue-600 py-4 hover:text-white focus:text-white"
                }`}
                onMouseEnter={() => setHoveredItem(link.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    src={
                      hoveredItem === link.path || pathname === link.path
                        ? link.icon?.white
                        : link.icon?.black
                    }
                    alt={link.name}
                    fill
                    className="object-contain focus:text-white"
                  />
                </div>
                <span className="">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
