"use client";

import "react-phone-input-2/lib/style.css";

import PhoneInput from "react-phone-input-2";

const ReactTelInput = () => {
  return (
    <div className="mobile-input">
      <PhoneInput
        placeholder="Please enter phone number"
        country={"my"}
        inputStyle={{ width: "100%", color: "#000" }}
        containerStyle={{ marginBottom: "1rem" }}
      />
    </div>
  );
};

export default ReactTelInput;
