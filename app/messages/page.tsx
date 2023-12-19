"use client";
import CustomButton from "@/components/CustomButton";
import Loading from "@/components/Loading";
import PersonCard from "@/components/Messages/PersonCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { persons, messages } from "@/constants";
import MessagesContent from "@/components/Messages/MessagesContent";

function page() {
  const router = useRouter();
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [readMessage, setReadMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePersonClick = (person: any) => {
    setSelectedPerson(person);
    sessionStorage.setItem("selectedPerson", JSON.stringify(person));
    setReadMessage(true);
  };

  useEffect(() => {
    const storedSelectedPerson = sessionStorage.getItem("selectedPerson");
    if (storedSelectedPerson) {
      const parsedSelectedPerson = JSON.parse(storedSelectedPerson);
      setSelectedPerson(parsedSelectedPerson);
      setLoading(false);
    }
  }, []);

  function getLastMessageTime(personId: number) {
    const filtered = messages.filter(
      (message) => message.sender_id === personId
    );
    const lastMessage = filtered[filtered.length - 1];
    if (lastMessage) {
      return new Date(lastMessage.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:bg-none bg-military">
      <div className="md:hidden flex relative h-24  items-center justify-center w-full">
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
        <div
          className={`${
            readMessage ? "hidden md:!flex" : "flex"
          } flex-col w-full md:w-fit md:h-full shadow-custom z-10`}
        >
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
              {persons.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onClick={() => handlePersonClick(person)}
                  lastMessageTime={getLastMessageTime(person.id)}
                  messages={messages}
                />
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
        <div
          className={`${
            readMessage ? "flex" : "hidden md:!flex"
          } bg-secondary h-full w-full min-w-[800px]`}
        >
          {loading ? (
            <Loading />
          ) : selectedPerson ? (
            <div className="flex-col md:w-full w-screen h-full">
              <div className="flex justify-between items-center border-b border-[#739072]/30 md:px-8 px-4 py-3 w-full">
                <div className="flex gap-4 items-center">
                  <CustomButton
                    containerStyles="md:hidden flex"
                    leftIcon="/assets/icons/left-green.svg"
                    handleClick={() => setReadMessage(false)}
                  />
                  <div className="relative w-[60px] min-w-[60px] h-[60px] rounded-full border border-[#E9B824]">
                    <Image
                      src={selectedPerson.image}
                      alt="Person Profile Photo"
                      fill
                      sizes="(max-width: 768px) 50vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg line-clamp-1">
                      {selectedPerson.fullname}
                    </span>
                    <small className="text-[#898959]">
                      {selectedPerson.isOnline ? "Online" : "Offline"}
                    </small>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <CustomButton leftIcon="/assets/icons/block-green.svg" />
                  <CustomButton leftIcon="/assets/icons/trash-red.svg" />
                </div>
              </div>
              <MessagesContent
                selectedPerson={selectedPerson}
                messages={messages}
                persons={persons}
              />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
