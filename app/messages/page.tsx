"use client";
import CustomButton from "@/components/CustomButton";
import PersonCard from "@/components/Messages/PersonCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  const persons = [
    {
      id: 1,
      fullname: "Robert Angier",
      image: "/assets/images/persons/robert-angier.png",
      isOnline: true,
      isPrivate: true,
    },
    {
      id: 2,
      fullname: "Alfred Borden",
      image: "/assets/images/persons/alfred-borden.png",
      isOnline: true,
      isPrivate: true,
    },
    {
      id: 3,
      fullname: "Olivia Wenscombe",
      image: "/assets/images/persons/olivia-wenscombe.png",
      isOnline: false,
      isPrivate: false,
    },
    {
      id: 4,
      fullname: "Sarah Borden",
      image: "/assets/images/persons/sarah-borden.png",
      isOnline: true,
      isPrivate: false,
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:bg-none bg-military">
      <div className="md:hidden flex relative h-24  items-center justify-center w-full">
        <div className="absolute left-2 h-full flex items-center justify-center">
          <CustomButton
            leftIcon="assets/icons/right-white.svg"
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
      <div className="flex md:rounded-[10px] rounded-t-[30px] md:w-fit w-full h-[calc(100vh-96px)] overflow-hidden">
        <div className="md:flex hidden flex-col items-center justify-between bg-primary h-full w-[110px] min-w-[110px] py-5">
          <div className="relative w-[70px] h-[70px] overflow-hidden rounded-full border-2 border-[#E9B824]">
            <Image
              src={"/assets/images/profile-photo.png"}
              alt="Profile Photo"
              fill
              sizes="(max-width: 768px) 100vw, 10vw"
            />
          </div>
          <CustomButton
            leftIcon="/assets/icons/plus-circle-white.svg"
            iconHeight={60}
            iconWidth={60}
            iconAlt="Plus White"
          />
        </div>
        <div className="flex flex-col w-full md:w-fit md:h-full shadow-custom z-10">
          <div className="flex md:justify-start justify-center items-center md:py-4 py-8 px-5 bg-secondary md:bg-[#4F6F52] gap-4 w-full md:shadow-custom z-10">
            <Image
              src={"/assets/icons/chat-white.svg"}
              width={20}
              height={20}
              alt="Chat White"
              className="md:flex hidden"
            />
            <span className="md:text-secondary font-semibold md:text-2xl text-3xl">
              New Messages
            </span>
          </div>
          <div className="flex flex-col gap-0 bg-secondary h-[calc(100%-64px)] w-full overflow-hidden">
            <div className="flex flex-col w-full md:p-0 p-4 h-full overflow-y-auto md:gap-0 gap-4">
              {persons.map((person, key) => (
                <PersonCard person={person} key={key} />
              ))}
            </div>
            <div className="flex flex-col gap-8 w-full p-4 border-t border-[#739072]/30">
              <CustomButton
                title="Send"
                containerStyles="bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom items-center justify-center"
                textStyles="text-secondary font-bold text-xl"
                handleClick={() => router.push("/create-user")}
              />
            </div>
          </div>
        </div>
        <div className="md:flex hidden flex-col items-center justify-between bg-secondary h-full w-full min-w-[800px] py-5">
          {/* Kişiye tıklandığında gelecek sayfa yapılacak state ile yönetilecek chat içeriği için ayrı bi json yazıcam tepeye */}
          <div className="flex flex-col gap-10 w-full h-full justify-center items-center">
            <div className="relative md:w-40 md:h-40 w-[110px] h-[110px] rounded-full bg-icon-bg bg-cover flex items-center justify-center">
              <Image
                src={"/assets/icons/chat-green.svg"}
                alt="Chat İkonu"
                width={60}
                height={60}
                className="md:w-[60px] md:h-[60px] w-[40px] h-[40px]"
              />
            </div>
            <span className="text-primary font-bold text-3xl md:w-[466px] w-full text-center">
              Start a conversation or reply your messages
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
