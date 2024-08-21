import { ResponseInfo } from "@/types";
import { SearchCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from 'react';

const IconImage = ({ icon, index }: { icon: any; index: number; }) => {
  const t = useTranslations();
  const [sizes, setSizes] = useState<string>(icon.sizes);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      const handleImageLoad = () => {
        setSizes(`${img.naturalWidth}x${img.naturalHeight}`);
      };

      img.addEventListener('load', handleImageLoad);

      // Cleanup event listener on unmount
      return () => {
        img.removeEventListener('load', handleImageLoad);
      };
    }
  }, [imgRef]);

  return (
    <div className="bg-secondary p-3 text-base rounded-md">
      <div className="flex">
        <a href={icon.href} target="_blank" rel="noopener noreferrer">
          <img
            ref={imgRef} // Attach ref to the img element
            src={icon.href}
            className="h-[50px] w-[50px]"
            alt={`Icon ${index + 1}`}
          />
        </a>
        <div className="flex flex-col ml-3">
          <span className="w-full">
            {index + 1}. Sizes {sizes}
          </span>
          <a href={`/download/${icon.href}`} target="_blank" rel="noopener noreferrer" className="text-primary text-sm mt-auto">
            {t('frontend.home.download')}
          </a>
        </div>
      </div>
    </div>
  );
};

export const Results = ({ info }: { info: ResponseInfo }) => {   
  const t = useTranslations(); 

  return ( 
    <div className="bg-secondary/60 p-5 text-xl flex flex-col gap-5 mb-10 rounded-md">
      <div className="font-semibold flex items-center">{t('frontend.home.results_for')}: {info.host} <SearchCheckIcon size={28} className="ml-2 text-green-700" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {info.icons.map((icon, index) =>
        <div key={index}> 
          <IconImage icon={icon} index={index} />
        </div> 
      )}
      </div>
    </div> 
  );
}
