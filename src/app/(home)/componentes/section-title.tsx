import { ComponentProps } from "react";
const SectionTitle = ({children, ...props}: ComponentProps<"p">) => {
  return ( 
    <p className="mb-3 pt-5 font-bold uppercase" {...props}>
      {children}
    </p>
   );
}
 
export default SectionTitle;