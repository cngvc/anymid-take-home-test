import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-2 gap-2 border border-gray-400 w-full rounded bg-white shadow-md overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
