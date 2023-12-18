import Image from "next/image";
import React from "react";

type Person = {
  fullname: string;
  image: string;
  isOnline: boolean;
  isPrivate: boolean;
};

interface IPersonCard {
  person: Person;
}

function PersonCard({ person }: IPersonCard) {
  return (
    <button className="flex justify-between p-4 md:gap-6 gap-4 md:border-b border-[#739072]/30 bg-[#FCF2DA] md:bg-transparent md:rounded-none rounded-[10px] md:shadow-none shadow-custom">
      <div className="flex items-center gap-4">
          <div className={`w-5 h-5 min-w-[20px] ${person.isOnline ? 'bg-[#29AE36]' : 'bg-transparent'}  rounded-full`} />
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
          <small className="text-[#898959]">2 New Messages</small>
        </div>
      </div>
      <div className="text-[#898959] py-2.5">12:00</div>
    </button>
  );
}

export default PersonCard;
