import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import AppLogo from "@/components/common/appLogo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SignUpForm from "./signUpForm";

interface PreSignUpProps {
  continueFn: () => void;
}

const PreSignUp = ({ continueFn }: PreSignUpProps) => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Before signing up...
      </h3>
      <hr className="h-[1px] border-[#8c94a1] my-4" />
      {/* <p>
        Welcome to TourneyPro, the ultimate platform for organizing and
        participating in sports tournaments! We&apos;re thrilled to have you
        join our community of sports enthusiasts.
      </p> */}
      <div className="max-h-[300px] overflow-y-auto">
        <p>
          To ensure security, integrity, and fairness of our platform, we kindly
          ask you to provide <b>accurate information</b> during the sign up
          process. Your information will be used not only within our system but
          also with third-party services integrated into TourneyPro.
        </p>
        <div className="text-lg font-semibold py-2">Why does it matter?</div>
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

      <hr className="h-[1px] border-[#8c94a1] my-4" />
      <div className="flex justify-center gap-4">
        <Button variant={"secondary"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button variant={"main"} disabled={!isChecked} onClick={continueFn}>
          Continue
        </Button>
      </div>
    </div>
  );
};

const SignUpDialog = () => {
  const params = useSearchParams();
  const isSignUp = params.get("signup") === "true";

  const [isContinueSignUp, setIsContinueSignUp] = useState(false);

  const onContinueSignUp = () => setIsContinueSignUp(true);

  return (
    <Dialog open={isSignUp}>
      <DialogContent className="max-w-md sm:max-w-2xl">
        <DialogHeader className="justify-center items-center">
          <div className="py-8">
            <AppLogo enableOnClick={false} />
          </div>
          <DialogTitle className="text-2xl font-medium tracking-normal pb-4">
            Sign Up
          </DialogTitle>
        </DialogHeader>
        {isContinueSignUp ? (
          <SignUpForm isDialog />
        ) : (
          <PreSignUp continueFn={onContinueSignUp} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
