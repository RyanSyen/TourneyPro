import { useEffect, useState } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase";

//! ignore and dont use this component
//! no need to verify email
const VerifyEmail = () => {
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const sendEmail = async () => {
      try {
        const success = await sendEmailVerification();
        if (success) console.log("Email sent successfully!");
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    };

    sendEmail();
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (sending) {
    return <p>Sending...</p>;
  }

  return <div>Verify Email</div>;
};

export default VerifyEmail;
