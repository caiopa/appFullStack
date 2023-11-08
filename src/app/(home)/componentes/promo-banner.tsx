import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

const PromoBanner = ({alt, className, ...props}: ImageProps) => {
  return ( 
    <Image 
     alt={alt}
     width={0} 
     height={0} 
     className={cn("h-auto w-full", className)} 
     sizes="100vw" 
     {...props}/>
   );
}
 
export default PromoBanner;