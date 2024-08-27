"use client";
 
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface CodeCopyBtnProps {
  children: ReactNode;
  className?: string;
}

export default function CodeCopyBtn({ children, className }: CodeCopyBtnProps) {
  const [copyOk, setCopyOk] = React.useState(false);

  const styles: React.CSSProperties = { position: 'absolute', right: '20px', top: '10px' };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof children === 'string' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(children);
      console.log('Copied!');

      setCopyOk(true);
      setTimeout(() => {
        setCopyOk(false);
      }, 1000);
    }
  };

  return (
    <div className={cn(  "code-copy-btn", className ?? "" )} style={styles} onClick={handleClick}>
      {copyOk ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1fd704" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
      )}
    </div>
  );
}
