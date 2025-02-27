"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const SideNav = () => {
  const pathname = usePathname();
 const [hoveredItem, setHoveredItem] = useState<string | null>(null);
 const [loading, setLoading] =useState(false);
const router = useRouter();

  const navLinks = [
    {
      name: "Get Started",
      path: "/getStarted",
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
      path: "/accounts",
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



    useEffect(() => {
      setLoading(false);
    }, [pathname]);

    const handleLinkClick = (href: string) => {
      setLoading(true);
      router.push(href);
    };


  return (
    <div className="hidden lg:block lg:w-[263px] bg-white text-gray-950 h-[900px] py-5">
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center p-2 focus:text-white transition-colors duration-300 px-6 text-sm ${
                  pathname === link.path
                    ? "bg-blue-600 py-4  focus:bg-blue-600"
                    : "hover:bg-blue-600 py-4 hover:text-white focus:bg-blue-600"
                } ${
                  loading ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path)
                }}
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
                    className="object-contain"
                  />
                </div>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
