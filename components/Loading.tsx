import React from "react";

function Loading() {
  return (
    <div className="flex flex-col gap-10 w-full h-full items-center justify-center text-3xl">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-primary h-12 w-12"></div>
      <span className="font-semibold">Loading...</span>
    </div>
  );
}

export default Loading;
