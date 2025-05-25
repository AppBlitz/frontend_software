import React from "react";

const messageValidation = (messageType: string, message: string): React.JSX.Element | null => {
  if (!message) return null;

  return (
    <div className={`mt-4 text-center text-sm ${messageType === "error" ? "text-red-500" : "text-green-600"}`}>
      {message}
    </div>
  );
};

export { messageValidation };
