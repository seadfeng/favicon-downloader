"use client";
import CodeCopyBtn from "@/components/shared/CodeCopyBtn";
import { Skeleton } from "@/components/ui/skeleton";
import { isBrowser } from "@/lib/utils";
import { useEffect, useState } from "react";
 

const ImageCode = ({ alt, title, src, codeStr, className}: { src: string; codeStr: string; title: string; alt: string; className?: string; }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (src && isBrowser()) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        setDimensions({ width: 100, height: 100 });
      };
    }
  }, [src]);

  if (!dimensions) {
    return(
      <div className="mb-5">
        <Skeleton className="h-10 w-52 rounded-md mb-5" />
        <Skeleton className="h-36 w-36 rounded-md mb-5" />
        <Skeleton className="h-16 w-full rounded-md mb-5" />
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold">{title}:</h2>
      <div className="max-w-[300px] my-5">
        <img 
          src={src} 
          alt={alt} 
          width={dimensions.width} 
          height={dimensions.height} 
          className="bg-secondary rounded-md min-w-[50px] min-h-[50px]" 
          loading="lazy" 
        />
      </div>
      <pre className="bg-secondary p-4 rounded-md flex items-center overflow-hidden relative my-5">
        <code className="text-sm">
          {codeStr}
        </code>
        <CodeCopyBtn>{codeStr}</CodeCopyBtn>
      </pre> 
    </div>
  );
};

export default ImageCode;
