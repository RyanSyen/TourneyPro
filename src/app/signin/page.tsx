"use client";

import Image from "next/image";

import useAuth from "@/hooks/useAuth";

const SignIn = () => {
  const { providers, signInWithProviders } = useAuth();

  return (
    <div className="h-f">
      <div className="text-2xl font-medium tracking-normal text-center pt-12 pb-4 hover:cursor-default">
        Welcome player!
      </div>
      <p className=" text-[#8C94A1] text-center pb-10 hover:cursor-default">
        Please choose a sign in method
      </p>
      <div className="flex flex-col justify-center gap-3 pb-4">
        {providers.map((provider) => {
          const providerName =
            provider.name.charAt(0).toLocaleUpperCase() +
            provider.name.slice(1);
          return (
            <div key={provider.id} className="flex justify-center items-center">
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
    </div>
  );
};

export default SignIn;
