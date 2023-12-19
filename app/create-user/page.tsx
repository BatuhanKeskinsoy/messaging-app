"use client";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const [name, setName] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:bg-none bg-military">
      <div className="md:hidden flex relative h-24 items-center justify-center w-full">
        <div className="absolute left-2 h-full flex items-center justify-center">
          <CustomButton
            leftIcon="assets/icons/left-white.svg"
            iconAlt="Chat Beyaz İkon"
            iconWidth={16}
            iconHeight={16}
            containerStyles="p-4"
            handleClick={() => router.push("/")}
          />
        </div>
        <Image
          src={"assets/icons/chat-white.svg"}
          width={50}
          height={50}
          alt="Chat Beyaz İkon"
        />
      </div>
      <div className="flex flex-col md:gap-20 gap-10 items-center md:justify-between justify-start bg-secondary md:w-[505px] md:h-fit h-[calc(100vh-96px)] w-full md:rounded-[30px] rounded-t-[30px] md:shadow-custom p-8 md:overflow-visible overflow-y-auto">
        <div className="hidden md:flex flex-col items-center justify-center gap-12 h-full -mt-28">
          <div className="relative md:w-40 md:h-40 w-[110px] h-[110px] rounded-full bg-icon-bg bg-cover flex items-center justify-center">
            <Image
              src={"/assets/icons/chat-green.svg"}
              alt="Chat İkonu"
              width={60}
              height={60}
              className="md:w-[60px] md:h-[60px] w-[40px] h-[40px]"
            />
          </div>
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <span className="font-semibold text-primary md:text-3xl text-2xl">
              Click, Connect and Chat!
            </span>
            <hr className="w-12 border-2 border-primary rounded-full" />
          </div>
        </div>
        <div className="flex md:hidden justify-center items-center pt-4">
          <span className="text-primary font-semibold text-3xl">Set Name</span>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="name" className="font-medium px-4">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter name"
              className="bg-[#FCF2DA] rounded-[20px] shadow-custom p-5 outline-none text-lg"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <CustomButton
            title="Set Name"
            containerStyles="hidden md:flex bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom items-center justify-center"
            textStyles="text-secondary font-bold text-xl"
            handleClick={() => router.push("/messages")}
          />
          <CustomButton
            title="Confirm"
            containerStyles="flex md:hidden bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom items-center justify-center"
            textStyles="text-secondary font-bold text-xl"
            handleClick={() => router.push("/messages")}
          />
        </div>
      </div>
    </main>
  );
}

export default page;
