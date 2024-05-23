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
    <div className="absolute inset-0 bg-white bg-opacity-95">
      <div className="flex justify-between">
        <Link
          href={`product/${id}`}
          className="text-black ml-1 hover:text-blue-600"
        >
          {title}
        </Link>

        <div className="mr-1">
          <p className="line-through text-gray-500">{price + price * 0.2}$</p>{" "}
          <p className="text-black ml-3">{price}$</p>
        </div>
      </div>

      <hr />
      <p className="m-1 text-left h-[74%]">{description}</p>
      <hr />
      <div className="flex justify-between m-1">
        <Button className="rounded-full aspect-square w-12 h-12 flex items-center justify-center border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
          <FaHeart />
        </Button>

        <Button className="rounded-full aspect-square w-12 h-12 flex items-center justify-center border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
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
      className="w-[15rem] text-xs rounded-none relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="min-h-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1374/1374072.png"
          alt={title || description}
          className="w-10 rotate-45 absolute"
        />
      </CardHeader>
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
            <img src={img} alt={title} />
            <CardTitle className="flex text-left mt-1 font-normal">
              {title}
            </CardTitle>
            <CardDescription className="flex text-left mt-1">
              <Rating score={score} />
            </CardDescription>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col justify-start">
        <div className="flex mt-1">
          <p className="line-through text-gray-500">{price + price * 0.2}$</p>{" "}
          <p className="text-black ml-3">{price}$</p>
        </div>
        <div className="flex flex-row mt-2">
          <FaMapMarkerAlt className="mr-2" /> <p>{address}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
