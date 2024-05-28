import * as React from "react";

import { GrLinkNext } from "react-icons/gr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SearchProductService } from "@/+core/services";
import { ProductType } from "@/+core/interfaces";
import ProductCard from "@/components/ui/product-card";
import LandingCarouse from "./components/main/main-carousel";
import LatestProduct from "./components/main/latest-product";

export default async function Home() {
  const { data, errors } = await SearchProductService({
    page: 1,
    limit: 10,
    isOnSale: true,
  });

  if (errors) {
    console.log("Error: ", errors[0].message);
  }

  const products: ProductType[] = data?.products?.data || [];

  return (
    <div className="flex flex-col w-full">
      <div>
        <div>
          <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
            <h1 className="bolder font-bold text-3xl">HOT DEALS</h1>
          </div>
        </div>

        <LandingCarouse />
      </div>

      <div>
        <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
          <h1 className="bolder font-bold text-3xl">ON SALE</h1>
          <p className="cursor-pointer hover:text-blue-500 flex flex-row mt-2">
            <span>View all</span> <GrLinkNext className="font-2xl mt-1 ml-2" />
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full my-5"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/3 lg:basis-1/4 mr-2 ml-2"
              >
                <div className="p-1">
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    avatar={product.avatar}
                    name={product.name}
                    score={5}
                    price={product.price}
                    description={product.description}
                    address={product.address}
                    isOnSale={product.isOnSale}
                    categoryId={""}
                    publisherId={""}
                    author={""}
                    images={[]}
                    status={""}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-10" />
          <CarouselNext className="mr-10" />
        </Carousel>
      </div>

      <LatestProduct />
    </div>
  );
}
