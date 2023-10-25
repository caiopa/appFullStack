'use client';
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string,
  imageUrls: string[]
} 

const ProductImages = (
  { imageUrls, name }: ProductImagesProps
) => {

  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  }

  
  return ( 
    <div className="flex flex-col">

      <div className="h-[380px] bg-accent flex w-full items-center justify-center">

        <Image 
        className="h-auto max-h-[70%] w-auto max-w-[80%]"
        src={currentImage}
        alt="Product Image" 
        width={0} height={0} sizes="100vw" 
        style={{
          objectFit: "contain",
        }}
        />

      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-8 px-5">

      {
        imageUrls.map((imageUrl) => (
          <div key={imageUrl} className={`flex justify-center items-center bg-accent rounded-lg h-[100px] ${imageUrl === currentImage && "border-2 border-solid border-primary"}`}
          onClick={() => handleImageClick(imageUrl)}
          >

            <Image 
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            src={imageUrl}
            alt={name} 
            width={0} height={0} sizes="100vw" 
            style={{
              objectFit: "contain",
            }}
            />
          </div>
        ))
      }
      </div>

    </div>
   );
}
 
export default ProductImages;