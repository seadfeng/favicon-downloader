import { HTMLAttributes } from 'react';

const classNames ={
  h1: "scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl",
  h2: "scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic", 
  ul: "my-6 [&>li]:mt-2",
  ol: "my-6 [&>li]:mt-2",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  small: "text-sm font-medium leading-none",
  table:{
    root: "w-full",
    th: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
    tr: "m-0 border-t p-0 even:bg-muted",
    td: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
  }
}

export const TypographyH1 = ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <h1 className={ className? className : classNames.h1 } {...props}>{children}</h1>;
};

export const TypographyH2 = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <h2  className={className? className : classNames.h2} {...props}>{children}</h2>;
};
export const TypographyH3 = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <h3 className={className? className : classNames.h3} {...props}>{children}</h3>;
};

export const TypographyH4 = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <h4 className={className? className : classNames.h4} {...props}>{children}</h4>;
};

export const TypographyP = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <p className={className? className : classNames.p} {...props}>{children}</p>;
};

export const TypographyBlockquote = ({ children, className,  ...props }: HTMLAttributes<HTMLQuoteElement> & { children?: React.ReactNode }) => {
  return <blockquote className={className? className : classNames.blockquote} {...props}>{children}</blockquote>;
};

export const TypographyUL = ({ children, className,  ...props }: HTMLAttributes<HTMLUListElement> & { children?: React.ReactNode }) => {
  return <ul className={className? className : classNames.ul} {...props}>{children}</ul>;
};
export const TypographyOL = ({ children, className,  ...props }: HTMLAttributes<HTMLUListElement> & { children?: React.ReactNode }) => {
  return <ol className={className? className : classNames.ol} {...props}>{children}</ol>;
};

export const TypographyInlineCode = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <code className={className? className : classNames.code}  {...props}>{children}</code>;
};

export const TypographyLead = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <p className={className? className : classNames.lead} {...props}>{children}</p>;
};
 
export const TypographySmall = ({ children, className,  ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
  return <small className={className? className : classNames.small} {...props}>{children}</small>;
};
 