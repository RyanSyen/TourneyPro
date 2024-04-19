import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const delay = 5000;

const CompleteSignUp = () => {
  const [secs, setSecs] = useState(delay / 1000);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, delay);

    const interval = setInterval(() => {
      setSecs((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return prev;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Sign Up Completed!
      </h1>
      <div>{`Redirecting you to home page in ${secs}`}</div>
    </div>
  );
};

export default CompleteSignUp;
