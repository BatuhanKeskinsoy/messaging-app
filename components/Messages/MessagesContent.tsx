"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import PasswordSecurity from "@/components/Messages/PasswordSecurity";

type Message = {
  id: number;
  user_id: number;
  sender_id: number;
  sender_message: string | null;
  user_message: string | null;
  created_at: string;
};

type Person = {
  id: number;
  image: string;
  fullname: string;
  isPrivate: boolean;
  password: string;
};

interface IMessagesContentProps {
  selectedPerson: Person | null;
  messages: Message[];
  persons: Person[];
}

function MessagesContent({
  selectedPerson,
  messages,
  persons,
}: IMessagesContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [selectedPerson]);

  const filteredMessages = messages
    .filter(
      (message) => selectedPerson && message.sender_id === selectedPerson.id
    )
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  return (
    <>
      <PasswordSecurity selectedPerson={selectedPerson} />
      <div
        ref={scrollContainerRef}
        className="flex flex-col h-[calc(100%-185px)] max-h-full max-w-full overflow-y-auto w-full md:p-8 p-4 gap-10"
      >
        {filteredMessages.map((message, key) => {
          const isSenderMessage = !!message.sender_message;
          const person = persons.find((p) => p.id === message.sender_id);
          const messageDate = new Date(message.created_at).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const messageTime = new Date(message.created_at).toLocaleDateString(
            [],
            {
              month: "short",
              day: "numeric",
            }
          );
          return (
            <div
              key={key}
              className={`flex ${
                isSenderMessage ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex ${
                  !isSenderMessage ? "flex-row-reverse" : ""
                } items-end gap-3`}
              >
                {isSenderMessage && (
                  <div className="relative w-[40px] min-w-[40px] h-[40px] rounded-full border border-[#E9B824] md:-mb-6">
                    <Image
                      src={person?.image || "/default-image.jpg"}
                      alt={person?.fullname || "Default Name"}
                      fill
                      sizes="(max-width: 768px) 50vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`${
                    isSenderMessage ? "bg-[#4F6F52]" : "bg-white"
                  } p-4 text-${
                    isSenderMessage ? "secondary" : "primary"
                  } md:max-w-[380px] shadow-custom text-sm`}
                  style={{
                    borderRadius: isSenderMessage
                      ? "20px 20px 20px 0"
                      : "20px 20px 0 20px",
                  }}
                >
                  {isSenderMessage
                    ? message.sender_message
                    : message.user_message}
                </div>
                <small className="text-[#898959]">
                  {messageDate}
                  {/*  - {messageTime} */}
                </small>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-5 md:px-8 px-4 py-3 border-t border-[#739072]/30">
        <CustomButton leftIcon="/assets/icons/file-green.svg" />
        <textarea
          name="message"
          cols={3}
          rows={2}
          placeholder="Enter your message..."
          className="bg-transparent outline-none shadow-inner border border-[#739072]/30 rounded-[10px] flex-1 p-4 text-sm"
        ></textarea>
        <CustomButton
          leftIcon="/assets/icons/send-white.svg"
          containerStyles="p-4 rounded-[10px] bg-primary"
        />
      </div>
    </>
  );
}

export default MessagesContent;
