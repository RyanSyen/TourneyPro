import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import AppLogo from "@/components/common/appLogo";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";

const SignInDialog = () => {
  const { providers, signInWithProviders } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const isSignIn = params.get("signin") === "true";

  if (!isSignIn) router.push("/");

  return (
    <Dialog open={isSignIn}>
      <DialogTrigger
        className="py-2 px-6 rounded-3xl bg-gradient-to-r from-[#E50B0D] to-[#CF0868] hover:from-[#c3090c] hover:to-[#b10659] transition-colors"
        type="button"
        onClick={() => router.push("/?signin=true")}
      >
        Sign In
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="justify-center items-center">
          <div className="py-8">
            <AppLogo enableOnClick={false} />
          </div>
          <DialogTitle className="text-2xl font-medium tracking-normal pb-4">
            Welcome player!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-3">
          {providers.map((provider) => {
            const providerName =
              provider.name.charAt(0).toLocaleUpperCase() +
              provider.name.slice(1);
            return (
              <div
                key={provider.id}
                className="flex justify-center items-center"
              >
                <button
                  className="flex justify-start items-center gap-3 bg-[#fcfcfc] text-slate-950 px-10 py-3 rounded-xl w-3/4 hover:scale-105 transition duration-200 ease-in-out text-sm"
                  onClick={() => signInWithProviders(provider.id)}
                >
                  <Image
                    src={`/logo/social-login/${provider.name}-icon.svg`}
                    alt={`${provider.name} icon`}
                    width={28}
                    height={28}
                  />
                  Continue with {providerName.toString()}
                </button>
              </div>
            );
          })}
        </div>
        <DialogFooter className="block w-full text-center pb-4">
          {/* <div className="flex gap-1 justify-center pb-8">
            <p className="text-sm text-[#8c94a1]">No account?</p>
            <Link
              href={"/?signup=true"}
              className="text-sm font-normal tracking-tight hover:text-[#e50b0d] hover:font-semibold"
            >
              Sign Up Now
            </Link>
          </div> */}
          <a
            className="text-sm cursor-pointer text-[#8C94A1] hover:text-[#FF2D2F]"
            onClick={() => router.back()}
          >
            Close
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
