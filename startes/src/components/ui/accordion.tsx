"use client";

// Accordion de shadcn/ui (MIT, © shadcn): https://github.com/shadcn-ui/ui
// sobre Radix UI Accordion (MIT). Adaptado a los tokens y la escala de StartEs.

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-line", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-6 py-5 text-left text-lg font-semibold transition-colors hover:text-brand-text focus-visible:outline-offset-2",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,border-color] duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold group-data-[state=open]:bg-gold group-data-[state=open]:text-[#1d1714]"
        >
          <Plus className="size-4" strokeWidth={2.25} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("max-w-[60ch] pb-6 text-ink-soft", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
