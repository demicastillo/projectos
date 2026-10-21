import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

type Item = { q: string; a: string };

export function Faq({ items }: { items: Item[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`p-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
