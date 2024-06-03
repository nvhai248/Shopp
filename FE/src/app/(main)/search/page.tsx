"use client";

import { useQuery } from "@apollo/client";
import { SearchProductQuery } from "@/+core/definegql";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/product-card";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import { ProductType, SearchConditionInput } from "@/+core/interfaces";
import { NavFilter } from "./navbar";

function useSearchFiltersFromURL() {
  const params = useSearchParams();
  const [filters, setFilters] = useState({
    keyword: params.get("keyword") || undefined,
    page: parseInt(params.get("page") || "1"),
    categoryIds: params.get("categoryIds")?.split(",") || undefined,
    limit: parseInt(params.get("limit") || "10"),
    isOnSale: params.get("isOnSale") === "true" || undefined,
    maxPrice: params.get("maxPrice")
      ? parseFloat(params.get("maxPrice")!)
      : undefined,
    minPrice: params.get("minPrice")
      ? parseFloat(params.get("minPrice")!)
      : undefined,
    publishersIds: params.get("publisherIds")?.split(",") || undefined,
    rate: params.get("rate") ? parseFloat(params.get("rate")!) : undefined,
  });

  useEffect(() => {
    const temp = {
      keyword: params.get("keyword") || undefined,
      page: parseInt(params.get("page") || "1"),
      categoryIds: params.get("categoryIds")?.split(",") || undefined,
      limit: parseInt(params.get("limit") || "10"),
      isOnSale: params.get("isOnSale") === "true" || undefined,
      maxPrice: params.get("maxPrice")
        ? parseFloat(params.get("maxPrice")!)
        : undefined,
      minPrice: params.get("minPrice")
        ? parseFloat(params.get("minPrice")!)
        : undefined,
      publishersIds: params.get("publisherIds")?.split(",") || undefined,
      rate: params.get("rate") ? parseFloat(params.get("rate")!) : undefined,
    };
    console.log(temp);

    setFilters(temp);
  }, [params]);

  return filters;
}

function createSearchConditions(filters: any) {
  return {
    page: filters.page,
    limit: filters.limit,
    keyword: filters.keyword,
    categoryIds: filters.categoryIds,
    isOnSale: filters.isOnSale,
    maxPrice: filters.maxPrice,
    minPrice: filters.minPrice,
    publisherIds: filters.publishersIds,
    rate: filters.rate,
  };
}

export default function Search() {
  const filters = useSearchFiltersFromURL();

  const { data, loading, error, refetch } = useQuery(SearchProductQuery, {
    variables: { searchConditionInput: createSearchConditions(filters) },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    refetch({ searchConditionInput: createSearchConditions(filters) });
  }, [filters]);

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
          Your search for "{filters.keyword}" revealed the following:
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
