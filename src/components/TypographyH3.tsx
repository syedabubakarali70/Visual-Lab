import { cn } from "@/lib/utils"


export function TypographyH3({children,className}:{children:string,className?:string}) {
    return (
      <h1 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight",className)}>
        {children}
      </h1>

    )
  }
  