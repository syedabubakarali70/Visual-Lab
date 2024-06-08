import { cn } from "@/lib/utils"

export function TypographyP({children,className}:{children:string,className?:string}) {
    return (
      <p className={cn("leading-7 [&:not(:first-child)]:mt-2 mb-4",className)}>
      {children}
    </p>
    )
  }
  