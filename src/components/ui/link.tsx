import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

const variants = cva("text-sm text-[#fcfcfc] no-underline cursor-auto", {
  variants: {
    variant: {
      action: "",
      breadcrumb:
        "text-[#8c94a1]  font-normal cursor-pointer hover:text-[#ff2d2f]",
    },
  },
  defaultVariants: {
    variant: "action",
  },
});

interface Props extends VariantProps<typeof variants> {
  className?: string;
  href: string;
  name: string;
}

const CustomLink = ({ className, variant, href, name }: Props) => {
  return (
    <Link href={href} className={cn(variants({ variant, className }))}>
      {name}
    </Link>
  );
};

export default CustomLink;
