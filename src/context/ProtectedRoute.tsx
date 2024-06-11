import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authContext = useAuthContext();

  useEffect(() => {
    if (!authContext?.user?.email) {
      router.push("/");
    }
  }, [router, authContext?.user]);

  return <div>{authContext?.user ? children : null}</div>;
};

export default ProtectedRoute;
