"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function Top() {
  const scrollTo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [show, setShow] = useState(true);
  const debouncedScroll = useDebounceCallback(
    () => {
      setShow(window.scrollY > 100);
    },
    150,
    {
      maxWait: 150,
    },
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll);
    debouncedScroll();
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  return (
    <div data-status={show ? "show": "hidden"} className={cn("fixed bottom-10 right-10 transition-all duration-200", show ? "opacity-100" : "bottom-0 opacity-0")}>
      <Button size="icon" variant="secondary" className="rounded-full h-10 w-10" onClick={()=> scrollTo()}>
        <ChevronUpIcon strokeWidth={2.5} size={25} />
      </Button>
    </div> 
  );
}
