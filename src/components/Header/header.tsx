"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/sq-logo.svg";
import bell from "../../../public/assets/bell.svg";
import menu from "../../../public/assets/menu-01.svg";

import { IoMdArrowDropdown } from "react-icons/io";
import { useHeader } from "@/contexts/HeaderContext";

const Header = () => {
  const { isHeaderVisible } = useHeader();
  if (!isHeaderVisible) return null;
  return (
    <div>
      <div className=" flex border-b border-[#d9d9de] justify-between h-[80px] items-center max-w-[1440px] relative ">
        <div className="flex justify-between items-center w-full p-6">
          <div className="block lg:hidden">
            <Image
              src={menu}
              alt="Squareme Icon"
              width={24}
              height={24}
              className="max-w-[24px] max-h-[24px] flex-1 "
            />
          </div>
          <Image
            src={logo}
            alt="Squareme Logo"
            width={100}
            height={24}
            className="max-w-[100px] max-h-[24px] flex-1 "
          />
          <div className="flex items-center justify-center gap-6">
            <Image
              src={bell}
              alt="notification icon"
              width={18}
              height={19}
              className="max-w-[18px] max-h-[19px] flex"
            />
            <div className="flex items-center">
              <p className="bg-#000 rounded-full flex items-center justify-center h-[50px] w-[65px] text-white font-medium bg-initials max-w-[50px] max-h-[50px] text-[16px] ">
                GA
              </p>
              <span>
                <IoMdArrowDropdown />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
