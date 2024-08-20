"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyUL } from "@/components/ui/typography";
import ReactMarkdown from 'react-markdown';

type Faq = {
  question: string;
  answer: string;
}
type ItemCF = ({faq,value}:{faq: Faq, value: string}) => React.ReactNode;

export function Faqs({ faqs, title }:{ faqs: Faq[], title?: string;}){ 

  const Item: ItemCF = ({faq,value})=>{
    return (
    <AccordionItem value={value}>
      <AccordionTrigger className="font-semibold">{faq.question}</AccordionTrigger>
      <AccordionContent className="prose dark:prose-invert text-base max-w-full">
        <ReactMarkdown components={ {
          ul: ({ children }) => <TypographyUL className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</TypographyUL>,
          a: ({ children, href }) => <a className="text-blue-600" href={href}>{children}</a>
        }}
          
          >{faq.answer}</ReactMarkdown>
      </AccordionContent>
    </AccordionItem>
    )
  }
  const items = faqs.map((item,index) => <Item key={index} value={`item-${index}`} faq={item} />)
  return (
    <>
    {title && <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-10">{title}</h2>}
    <Accordion type="single" collapsible className="w-full">{items}</Accordion>
    </>
  )
}