"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";

interface INewPersonProps {
  setNewPerson?: Dispatch<SetStateAction<boolean>>;
}

function NewPerson({ setNewPerson }: INewPersonProps) {
  const [name, setName] = useState("");
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);

    if (value !== "" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = () => {
    router.push("/messages");
    setNewPerson && setNewPerson(false)
  };
  return (
    <div className="flex flex-col gap-10 items-center md:justify-between justify-start bg-secondary md:w-[505px] md:h-fit h-[calc(100vh-96px)] w-full md:rounded-[30px] rounded-t-[30px] md:shadow-custom p-8 md:overflow-visible overflow-y-auto">
      <div className="hidden md:flex flex-col items-center justify-center gap-12 h-full mt-8">
        <div className="relative md:w-40 md:h-40 w-[110px] h-[110px] rounded-full bg-icon-bg bg-cover flex items-center justify-center">
          <Image
            src={"/assets/icons/chat-green.svg"}
            alt="Chat İkonu"
            width={60}
            height={60}
            className="md:w-[60px] md:h-[60px] w-[40px] h-[40px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor="name"
            className="flex gap-2 items-center justify-start font-medium"
          >
            <Image
              src={"/assets/icons/user-green.svg"}
              width={15}
              height={20}
              alt="Kilit Açık"
            />
            To :
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
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor="password"
            className="flex gap-2 items-center justify-start font-medium"
          >
            <Image
              src={"/assets/icons/locked-green.svg"}
              width={15}
              height={20}
              alt="Kilit Açık"
            />
            Password :
          </label>
          <div className="flex gap-5 items-center justify-center">
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="password"
                value={value}
                placeholder="*"
                onChange={(e) => handleInputChange(index, e.target.value)}
                ref={(input) => (inputRefs.current[index] = input)}
                className="md:w-[70px] md:h-[80px] w-[15%] h-[20vw] max-w-[70px] max-h-[80px] bg-[#FCF2DA] shadow-custom rounded-[10px] outline-none flex items-center justify-center text-center md:text-4xl text-xl placeholder:text-primary/30"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <CustomButton
          title="Confirm"
          containerStyles="flex bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom items-center justify-center"
          textStyles="text-secondary font-bold text-xl"
          handleClick={handleConfirm}
        />
        {errorMessage && (
          <span className="text-red-500 text-center">{errorMessage}</span>
        )}
      </div>
    </div>
  );
}

export default NewPerson;
