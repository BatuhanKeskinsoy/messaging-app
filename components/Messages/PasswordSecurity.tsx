"use client";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomButton from "@/components/CustomButton";

interface ISelectedPerson {
  id: number;
  isPrivate: boolean;
  password: string | null;
}

interface IPasswordSecurityProps {
  selectedPerson: ISelectedPerson | null;
}

function PasswordSecurity({ selectedPerson }: IPasswordSecurityProps) {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [passwordSecurityShow, setPasswordSecurityShow] = useState(true);

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);

    if (value !== "" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const enteredPassword = inputValues.join("");
    const correctPassword = selectedPerson?.password;

    if (enteredPassword === correctPassword) {
      setErrorMessage(null);
      setErrorMessage("True Password !");
      setPasswordSecurityShow(false);

      const storedPasswordSecurity = localStorage.getItem("password_security");
      let parsedPasswordSecurity = storedPasswordSecurity
        ? JSON.parse(storedPasswordSecurity)
        : [];

      const existingEntryIndex = parsedPasswordSecurity.findIndex(
        (entry: any) => entry.id === selectedPerson?.id
      );

      if (existingEntryIndex !== -1) {
        // Entry for this ID exists, update it
        parsedPasswordSecurity[existingEntryIndex].isAuthenticated = true;
      } else {
        // No entry for this ID, create a new one
        parsedPasswordSecurity.push({
          id: selectedPerson?.id,
          isAuthenticated: true,
        });
      }

      localStorage.setItem(
        "password_security",
        JSON.stringify(parsedPasswordSecurity)
      );
    } else {
      setErrorMessage("Wrong password. Please try again.");
      setInputValues(["", "", "", "", ""]);
      setPasswordSecurityShow(true);
    }
  };

  useEffect(() => {
    const storedPasswordSecurity = localStorage.getItem("password_security");
    let parsedPasswordSecurity;

    if (storedPasswordSecurity) {
      parsedPasswordSecurity = JSON.parse(storedPasswordSecurity);

      const foundEntry = parsedPasswordSecurity.find(
        (entry: any) => entry.id === selectedPerson?.id && entry.isAuthenticated
      );

      if (foundEntry) {
        setPasswordSecurityShow(false);
      } else {
        setPasswordSecurityShow(true);
        setInputValues(["", "", "", "", ""]);
        setErrorMessage(null);
      }
    } else {
      setPasswordSecurityShow(true);
      setInputValues(["", "", "", "", ""]);
      setErrorMessage(null);
    }
  }, [selectedPerson]);

  useEffect(() => {
    // Sayfa ilk yüklendiğinde çalışacak olan kısım
    const storedPasswordSecurity = localStorage.getItem("password_security");
    let parsedPasswordSecurity;

    if (storedPasswordSecurity) {
      parsedPasswordSecurity = JSON.parse(storedPasswordSecurity);

      if (
        parsedPasswordSecurity.id === selectedPerson?.id &&
        parsedPasswordSecurity.isAuthenticated
      ) {
        setPasswordSecurityShow(false);
      }
    }
  }, []);

  return (
    <div
      className={`${
        !passwordSecurityShow || !selectedPerson?.isPrivate ? "hidden" : "flex"
      }  flex-col gap-8 items-center md:justify-end justify-between md:bg-secondary w-full h-[calc(100%-85px)] lg:p-40 p-4`}
    >
      <div className="flex flex-col items-center justify-center gap-8 h-full py-12">
        <div className="relative min-w-[110px] min-h-[110px] w-[110px] h-[110px] rounded-full bg-icon-bg bg-cover flex items-center justify-center">
          <Image
            src={"/assets/icons/locked-filled-green.svg"}
            alt="Chat İkonu"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <span className="font-semibold text-primary md:text-xl text-lg">
            Message Password
          </span>
          <hr className="w-12 border-2 border-primary rounded-full" />
        </div>
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
      <div className="flex flex-col gap-8 w-full">
        <CustomButton
          title="Confirm"
          containerStyles="bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom"
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

export default PasswordSecurity;
