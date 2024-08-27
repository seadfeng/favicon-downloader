"use client";
import { Button } from '@/components/ui/button';
import { downloadBase64Image, getBase64MimeType, getImageMimeType } from '@/lib/utils';
import { ResponseInfo } from '@/types';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { SearchCheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';


function fetchImage(url: string): Promise<{ blob: Blob, extension: string }> {
  return fetch(url).then(response => {
    const contentType = response.headers.get('Content-Type') || '';
    const extension = getImageMimeType(contentType);
    return response.blob().then(blob => ({ blob, extension }));
  });
}

function addBase64Image({ zip, base64Data, domain, index, sizes }: { zip: JSZip; base64Data: string; domain: string; index: number, sizes?: string; }) {
  const data = base64Data.split(',')[1]; // Remove the base64 metadata
  const extension = getBase64MimeType(base64Data);
  const filename = `favicon-${domain}-${index + 1}-${sizes}.${extension}`;
  zip.file(filename, data, { base64: true });
}

function addUrlImage({ zip, href, domain, index, sizes }: { zip: JSZip; href: string; domain: string; index: number, sizes?: string; }): Promise<void> {
  return fetchImage(href).then(({ blob, extension }) => {
    const filename = `favicon-${domain}-${index + 1}-${sizes}.${extension}`;
    zip.file(filename, blob);
  });
}

const downloadImagesAsZip = async (icons: { href: string, sizes?: string }[], domain: string) => {
  const zip = new JSZip();
  const folder = zip.folder(`${domain}-images`);

  const imagePromises = icons.map(async ({ href, sizes }, index) => {
    if (/^data:image\//.test(href)) {
      return addBase64Image({ zip: folder!, base64Data: href, domain, index, sizes });
    } else {
      return await addUrlImage({ zip: folder!, href: `/download/${href}`, domain, index, sizes });
    }
  });

  // Handle Promise.all for all URL images and generate the zip
  Promise.all(imagePromises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${domain}-favicons.zip`);
    });
  });
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
}
const IconImage = ({ icon, index, onLoad, domain }: { icon: any; index: number; domain: string; onLoad?: (sizes: string)=> void  }) => { 
  const [sizes, setSizes] = useState<string>(icon.sizes);
  const imgRef = useRef<HTMLImageElement>(null);
  const t = useTranslations();
  useEffect(() => {
    if (isBrowser() &&imgRef.current) {
      const img = imgRef.current;
      const handleImageLoad = () => {
        setSizes(`${img.naturalWidth}x${img.naturalHeight}`);
        if(onLoad) onLoad(`${img.naturalWidth}x${img.naturalHeight}`);
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
            ref={imgRef}
            src={icon.href}
            className="h-[50px] w-[50px]" 
            alt={`Icon ${index + 1}`}
          />
        </a>
        <div className="flex flex-col ml-3 text-sm">
          <span className="w-full">
            {index + 1}. Sizes {sizes}
          </span>
          <a href={ /^data:image\//.test(icon.href) ? icon.href : `/download/${icon.href}`} onClick={(e)=>{ 
            if( /^data:image\//.test(icon.href) ){
              e.preventDefault();
              downloadBase64Image({domain , base64Data: icon.href} ) 
            } 
          }} target="_blank" rel="noopener noreferrer" className="text-primary mt-auto ">
            {t('frontend.home.download')}
          </a>
        </div>
      </div>
    </div>
  );
};

export const Results = ({ info }: { info: ResponseInfo }) => {
  const t = useTranslations();
  const [iconInfo, setIconInfo] = useState<ResponseInfo>(info); 
  const handleDownloadZip = () => {
    downloadImagesAsZip(info.icons, info.host);
  };

  // update icon sizes
  const iconOnLoad=({sizes, iconIndex}:{sizes: string; iconIndex: number})=>{
    setIconInfo({
      ...iconInfo,
      icons: iconInfo.icons.map((icon, index) =>{
        if(index === iconIndex){
          return {...icon, sizes: sizes}
        }else{
          return icon
        }
      })
    })
  }

  return (
    <div className="bg-secondary/60 p-5 text-xl flex flex-col gap-5 mb-10 rounded-md">
      <div className="font-semibold flex items-center">
        {t('frontend.home.results_for')}: {iconInfo.host}
        <SearchCheckIcon size={28} className="ml-2 text-green-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {iconInfo.icons.map((icon, index) =>
          <div key={index}>
            <IconImage domain={iconInfo.host} icon={icon} index={index} onLoad={(sizes)=>{ iconOnLoad({ sizes, iconIndex: index  }) }} />
          </div>
        )}
      </div>
      <Button
        onClick={handleDownloadZip} 
        className="rounded-md w-[50%] mx-auto font-semibold"
      >
        {t('frontend.home.download_zip')}
      </Button>
    </div>
  );
};
