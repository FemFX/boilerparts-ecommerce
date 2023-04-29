import { useState, useEffect } from "react";

export const usePopup = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    window.scrollTo(0, 0);
    document.querySelector("overlay")?.classList.add("open");
    document.querySelector(".body")?.classList.add("overflow-hidden");
    setOpen(!open);
  };
  const closePopup = () => {
    document.querySelector("overlay")?.classList.add("open");
    document.querySelector(".body")?.classList.add("overflow-hidden");
    setOpen(false);
  };

  useEffect(() => {
    const overlay = document.querySelector(".overlay");

    overlay?.addEventListener("click", closePopup);

    return () => overlay?.removeEventListener("click", closePopup);
  }, [open]);

  return { toggleOpen, open, closePopup };
};
