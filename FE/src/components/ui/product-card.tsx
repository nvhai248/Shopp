"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./card";
import Rating from "./rating";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import { ProductType } from "@/+core/interfaces";

function ProductDetail({
  id,
  avatar,
  name,
  score,
  price,
  description,
  address,
}: ProductType) {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 py-4 flex flex-col">
      <div className="flex flex-col w-full items-start gap-2 px-4">
        <Link
          href={`/product?id=${id}`}
          className="text-black hover:text-blue-600 text-sm"
        >
          {name}
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
  avatar,
  name,
  score,
  price,
  description,
  address,
  isOnSale,
}: ProductType) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="!w-[300px] text-sm rounded-none relative overflow-hidden !h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOnSale && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1374/1374072.png"
          alt={name || description}
          className="w-10 rotate-45 object-cover absolute"
        />
      )}

      <CardContent className="mt-5">
        {isHovered ? (
          <ProductDetail
            id={id}
            author={avatar}
            name={name}
            score={score}
            price={price}
            description={description}
            address={address}
            isOnSale={false}
            categoryId={""}
            publisherId={""}
            avatar={""}
            images={[]}
            status={""}
          />
        ) : (
          <>
            <img
              src={avatar}
              alt={name}
              className="w-full h-[230px] object-cover mt-2"
            />
            <CardTitle className="flex text-left mt-4 font-normal text-sm">
              {name}
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
