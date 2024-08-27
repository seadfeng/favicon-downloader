"use client";
import { Button } from '@/components/ui/button';
import { getBase64MimeType, getImageMimeType, isBrowser } from '@/lib/utils';
import { ResponseInfo } from '@/types';
import { SearchCheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

function fetchImage(url: string): Promise<{ blob: Blob, extension: string }> {
  return fetch(url).then(response => {
    const contentType = response.headers.get('Content-Type') || '';
    const extension = getImageMimeType(contentType);
    return response.blob().then(blob => ({ blob, extension }));
  });
}

const downloadImagesAsZip = (icons: { href: string, sizes?: string }[], domain: string) => {
  if (typeof window === 'undefined' || !window.navigator) {
    console.warn('Download is not available in this environment');
    return;
  }

  Promise.all([
    import('jszip'),
    import('file-saver')
  ]).then(([JSZip, FileSaver]) => {
    const zip = new JSZip.default();
    const folder = zip.folder(`${domain}-images`);

    const addBase64Image = ({ base64Data, index, sizes }: { base64Data: string; index: number, sizes?: string; }) => {
      const data = base64Data.split(',')[1];
      const extension = getBase64MimeType(base64Data);
      const filename = `favicon-${domain}-${index + 1}-${sizes}.${extension}`;
      folder!.file(filename, data, { base64: true });
    };

    const addUrlImage = ({ href, index, sizes }: { href: string; index: number, sizes?: string; }): Promise<void> => {
      return fetchImage(href).then(({ blob, extension }) => {
        const filename = `favicon-${domain}-${index + 1}-${sizes}.${extension}`;
        folder!.file(filename, blob);
      });
    };

    const imagePromises = icons.map(({ href, sizes }, index) => {
      if (/^data:image\//.test(href)) {
        return addBase64Image({ base64Data: href, index, sizes });
      } else {
        return addUrlImage({ href: `/download/${href}`, index, sizes });
      }
    });

    Promise.all(imagePromises)
      .then(() => zip.generateAsync({ type: 'blob' }))
      .then(content => FileSaver.saveAs(content, `${domain}-favicons.zip`))
      .catch(error => {
        console.error('Error creating or saving zip:', error);
      });
  }).catch(error => {
    console.error('Failed to load required modules:', error);
  });
};

const IconImage = ({ icon, index, onLoad, domain }: { icon: any; index: number; domain: string; onLoad?: (sizes: string) => void }) => {
  const [sizes, setSizes] = useState<string>(icon.sizes);
  const imgRef = useRef<HTMLImageElement>(null);
  const t = useTranslations();

  const downloadBase64Image = useCallback(({ base64Data, domain }: { base64Data: string, domain: string }) => {
    if (typeof window === 'undefined' || !window.navigator) {
      console.warn('Download is not available in this environment');
      return;
    }
    const link = document.createElement('a');
    let imgType = getBase64MimeType(base64Data);
    link.href = base64Data;
    link.download = `favicon-${domain}.${imgType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    if (isBrowser() && imgRef.current) {
      const img = imgRef.current;
      const handleImageLoad = () => {
        const newSizes = `${img.naturalWidth}x${img.naturalHeight}`;
        setSizes(newSizes);
        if (onLoad) onLoad(newSizes);
      };

      img.addEventListener('load', handleImageLoad);
      return () => {
        img.removeEventListener('load', handleImageLoad);
      };
    }
  }, [onLoad]);

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
          <a href={/^data:image\//.test(icon.href) ? icon.href : `/download/${icon.href}`}
            onClick={(e) => {
              if (/^data:image\//.test(icon.href)) {
                e.preventDefault();
                downloadBase64Image({ domain, base64Data: icon.href });
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary mt-auto"
          >
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

  const handleDownloadZip = useCallback(() => {
    if (typeof window === 'undefined' || !window.navigator) {
      console.warn('Download is not available in this environment');
      return;
    }
    downloadImagesAsZip(iconInfo.icons, iconInfo.host);
  }, [iconInfo.icons, iconInfo.host]);

  const iconOnLoad = useCallback(({ sizes, iconIndex }: { sizes: string; iconIndex: number }) => {
    setIconInfo(prevInfo => ({
      ...prevInfo,
      icons: prevInfo.icons.map((icon, index) =>
        index === iconIndex ? { ...icon, sizes } : icon
      )
    }));
  }, []);

  return (
    <div className="bg-secondary/60 p-5 text-xl flex flex-col gap-5 mb-10 rounded-md">
      <div className="font-semibold flex items-center">
        {t('frontend.home.results_for')}: {iconInfo.host}
        <SearchCheckIcon size={28} className="ml-2 text-green-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {iconInfo.icons.map((icon, index) => (
          <div key={index}>
            <IconImage
              domain={iconInfo.host}
              icon={icon}
              index={index}
              onLoad={(sizes) => iconOnLoad({ sizes, iconIndex: index })}
            />
          </div>
        ))}
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