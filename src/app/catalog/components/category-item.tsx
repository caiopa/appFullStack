import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return ( 
    <Link href={`/catalog/${category.slug}`}>
      <div className="flex flex-col">
        <div className="bg-category-item-gradient w-full h-[150px] flex items-center justify-center">
        <Image
              src={category.imageUrl}
              alt={category.name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            />
        </div>
        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
   );
}
 
export default CategoryItem;