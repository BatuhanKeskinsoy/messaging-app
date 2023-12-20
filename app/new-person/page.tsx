"use client"
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import NewPerson from "@/components/Messages/NewPerson";

function page() {
  const router = useRouter();
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
            handleClick={() => router.push("/messages")}
          />
        </div>
        <Image
          src={"assets/icons/chat-white.svg"}
          width={50}
          height={50}
          alt="Chat Beyaz İkon"
        />
      </div>
      <NewPerson />
    </main>
  );
}

export default page;
