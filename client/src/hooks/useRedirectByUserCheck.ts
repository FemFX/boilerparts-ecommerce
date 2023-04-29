import { checkUserAuth } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useActions } from "./useActions";

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false);

  const router = useRouter();
  const shouldCheckAuth = useRef(true);

  const { setUser } = useActions();

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
      checkUser();
    }
  }, []);

  const checkUser = async () => {
    const user = await checkUserAuth();

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true);
        return;
      }
      router.push("/dashboard");
      return;
    }
    if (user) {
      setUser(user);
      setShouldLoadContent(true);
      return;
    }
    router.push("/");
  };

  return { shouldLoadContent };
};
export default useRedirectByUserCheck;
