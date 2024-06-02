"use client";

import ProductCard from "@/components/ui/product-card";
import { NavFilter } from "./navbar";
import { ProductType } from "@/+core/interfaces";
import { useQuery } from "@apollo/client";
import { SearchProductQuery } from "@/+core/definegql";
import Spinner from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";

export default function Search() {
  const params = useSearchParams();
  const [keyword, setKeyword] = useState<string>(params.get("keyword") || "");

  const { data, loading, error } = useQuery(SearchProductQuery, {
    variables: {
      searchConditionInput: {
        page: 1,
        limit: 10,
        keyword: keyword,
      },
    },
  });

  let products: ProductType[] = [];

  if (loading) {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <SomethingWhenWrong />;
  } else if (data && data.products && data.products.data) {
    products = data.products.data;
  }

  return (
    <div className="flex w-full">
      <NavFilter />
      <div className="w-3/4 p-5 flex flex-col items-center">
        <h1 className="text-center text-3xl mb-5 w-full">
          Your search for "{keyword}" revealed the following:
        </h1>
        <div className="mx-auto w-32 border-b border-gray-500 mb-5"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[5rem] gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              avatar={product.avatar}
              name={product.name}
              rate={product.rate || 0}
              price={product.price}
              description={product.description}
              address={product.address}
              isOnSale={product.isOnSale}
              priceSale={product.priceSale}
              categoryId={""}
              publisherId={""}
              author={""}
              images={[]}
              status={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
