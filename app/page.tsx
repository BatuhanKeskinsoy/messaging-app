"use client";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-8 items-center md:justify-end justify-between md:bg-secondary md:w-[505px] md:min-h-[637px] md:h-fit h-screen w-full rounded-[30px] md:shadow-custom p-8">
        <div className="flex flex-col items-center justify-center gap-8 h-full py-12">
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
        <div className="flex flex-col gap-8 w-full">
          <CustomButton
            title="Create User"
            containerStyles="bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom"
            textStyles="text-secondary font-bold text-xl"
            handleClick={() => router.push("/create-user")}
          />
          <CustomButton
            title="Import User"
            containerStyles="bg-primary rounded-[20px] md:p-[20px_12px] p-[16px_12px] w-full shadow-custom"
            textStyles="text-secondary font-bold text-xl"
            handleClick={() => router.push("/import-user")}
          />
        </div>
      </div>
    </main>
  );
}
