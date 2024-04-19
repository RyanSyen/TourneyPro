"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  next: () => void;
}

const SignUpTerms = ({ next }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-2">
        Before signing up...
      </h3>
      {/* <hr className="h-[1px] border-[#8c94a1] my-4" /> */}
      <div className="">
        <p>
          To ensure security, integrity, and fairness of our platform, we kindly
          ask you to provide <b>accurate information</b> during the sign up
          process. Your information will be used not only within our system but
          also with third-party services integrated into TourneyPro.
        </p>
        <div className="text-lg font-semibold pt-4 pb-2">
          Why does it matter?
        </div>
        <ul className="bg-[#2d3038] py-4 px-6 list-decimal [&>li]:pt-3">
          <li>
            1. Security: Accurate information helps us verify your identity and
            protect your account from unauthorized access.
          </li>
          <li>
            2. Order: Accurate information ensure smooth organization and
            participation in tournaments, maintaining order across the platform
            services.
          </li>
          <li>
            3. Fairness: Accurate information contributes towards fair play and
            sportsmanship, preventing any attempts for players to gain unfair
            advantage or manipulate data.
          </li>
        </ul>
        <div className="text-[#8C94A1] text-sm pt-1">
          * To ensure a seamless sign up experience, we kindly ask that you
          complete all steps in one go without leaving the form.
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="terms"
            className="border-[#8c94a1] data-[state=checked]:bg-[#e50b0d] data-[state=checked]:border-[#e50b0d]"
            onClick={() => setIsChecked((prev) => !prev)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            I have read and understood
          </label>
        </div>
      </div>

      {/* <hr className="h-[1px] border-[#8c94a1] my-4" /> */}
      <div className="flex justify-center gap-4">
        {/* <Button variant={"secondary"} onClick={() => router.back()}>
          Cancel
        </Button> */}
        {/* <Button variant={"main"} disabled={!isChecked} onClick={next}>
          Continue
        </Button> */}
      </div>
      <section className="flex justify-end items-center gap-2 pt-8">
        <Button
          type="submit"
          variant={"main"}
          disabled={!isChecked}
          onClick={next}
        >
          Proceed
        </Button>
      </section>
    </div>
  );
};

export default SignUpTerms;
