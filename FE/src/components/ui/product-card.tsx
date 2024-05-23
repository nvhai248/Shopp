"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import Rating from "./rating";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

interface ProductCardProps {
  id: string;
  img: string;
  title: string;
  score: number;
  price: number;
  description: string;
  address: string;
}

function ProductDetail({
  id,
  img,
  title,
  score,
  price,
  description,
  address,
}: ProductCardProps) {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 py-4 flex flex-col">
      <div className="flex flex-col w-full items-start gap-2 px-4">
        <Link
          href={`/product?id=${id}`}
          className="text-black hover:text-blue-600 text-sm"
        >
          {title}
        </Link>

        <div className="flex items-center gap-2">
          <p className="line-through text-gray-500">{price + price * 0.2}$</p>{" "}
          <p className="text-black">{price}$</p>
        </div>
      </div>

      <hr className="my-2" />
      <p className="px-4 text-left">{description}</p>

      <div className="flex justify-between m-1 flex-1 relative">
        <Button className="rounded-full aspect-square w-12 h-12 flex items-center  absolute left-4 bottom-0 justify-center border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
          <FaHeart />
        </Button>

        <Button className="rounded-full aspect-square w-12 h-12 flex items-center justify-center absolute right-4 bottom-0 border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
          <FaEye />
        </Button>
      </div>
    </div>
  );
}

export default function ProductCard({
  id,
  img,
  title,
  score,
  price,
  description,
  address,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="!w-[300px] text-sm rounded-none relative overflow-hidden !h-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <CardHeader className="min-h-10 w-full" >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1374/1374072.png"
          alt={title || description}
          className="w-10 rotate-45 object-cover"
        />
      </CardHeader> */}
      <CardContent>
        {isHovered ? (
          <ProductDetail
            id={id}
            img={img}
            title={title}
            score={score}
            price={price}
            description={description}
            address={address}
          />
        ) : (
          <>
            <img
              src={img}
              alt={title}
              className="w-full h-[230px] object-cover"
            />
            <CardTitle className="flex text-left mt-4 font-normal text-sm">
              {title}
            </CardTitle>
            <CardDescription className="flex text-left mt-1">
              <Rating score={score} />
            </CardDescription>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col justify-start">
        <div className="flex mt-1 justify-start w-full">
          <span className="line-through text-gray-500">
            {price + price * 0.2}$
          </span>
          <span className="text-black ml-3">{price}$</span>
        </div>
      </CardFooter>
    </Card>
  );
}
