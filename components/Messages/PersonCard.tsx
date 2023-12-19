import Image from "next/image";
import React from "react";

type Person = {
  id: number;
  fullname: string;
  image: string;
  isOnline: boolean;
  isPrivate: boolean;
};

interface Message {
  id: number;
  user_id: number;
  sender_id: number;
  sender_message: string | null;
  user_message: string | null;
  created_at: string;
}

interface IPersonCard {
  person: Person;
  onClick: () => void;
  lastMessageTime: string;
  messages: Message[];
}

function PersonCard({
  person,
  onClick,
  lastMessageTime,
  messages,
}: IPersonCard) {
  function getLastUserResponseIndex(messages: any[], personId: number) {
    let lastIndex = 0;

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];

      if (message.sender_id === personId) {
        if (message.user_message !== null) {
          lastIndex = i;
          break;
        }
      }
    }

    return lastIndex;
  }

  const lastUserResponseIndex = getLastUserResponseIndex(messages, person.id);
  const senderMessagesAfterLastUserResponse = messages.filter(
    (message, index) =>
      index > lastUserResponseIndex && message.sender_id === person.id
  );

  const newMessageCount = senderMessagesAfterLastUserResponse.length;

  return (
    <button
      onClick={onClick}
      className="flex justify-between p-4 md:gap-6 gap-4 md:border-b border-[#739072]/30 bg-[#FCF2DA] md:bg-transparent md:rounded-none rounded-[10px] md:shadow-none shadow-custom md:min-w-[400px]"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-5 h-5 min-w-[20px] ${
            person.isOnline ? "bg-[#29AE36]" : "bg-transparent"
          }  rounded-full`}
        />
        <div className="relative min-w-[70px] w-[70px] h-[70px] border-2 border-[#E9B824] rounded-full overflow-hidden">
          <Image
            src={person.image}
            alt={person.fullname}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-1.5">
          <span className="text-[#3A4D39] font-semibold text-lg line-clamp-1 text-left">
            {person.fullname}
          </span>

          {newMessageCount > 1 ? (
            <small className="text-[#898959]">
              {newMessageCount} new messages
            </small>
          ) : newMessageCount == 1 ? (
            <small className="text-[#898959]">
              {newMessageCount} new message
            </small>
          ) : (
            <small className="text-[#898959]">No new messages</small>
          )}
        </div>
      </div>
      <div className="text-[#898959] py-2.5">{lastMessageTime}</div>
    </button>
  );
}

export default PersonCard;
