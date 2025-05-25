import Section from "../../generics/section";
import { LoginForm } from "../../forms/loginForm";
import React, { useState } from "react";


const form_login: React.FC = () => {
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  return (
    <div>
      <Section centered>
        <LoginForm onLoginMessage={setLoginMessage} />
        {loginMessage && (
          <div className="mt-4 text-center text-red-500 font-semibold">
            {loginMessage}
          </div>
        )}
      </Section>
    </div>
  );
};

export default form_login;
