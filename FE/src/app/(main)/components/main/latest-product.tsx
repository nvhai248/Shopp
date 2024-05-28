"use client";

import { SearchProductQuery } from "@/+core/definegql";
import { ProductType } from "@/+core/interfaces";
import ProductCard from "@/components/ui/product-card";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@apollo/client";

export default function LatestProduct() {
  const { data, loading, error } = useQuery(SearchProductQuery, {
    variables: {
      searchConditionInput: {
        page: 1,
        limit: 12,
      },
    },
  });

  let products: ProductType[] = [];

  if (error) {
    console.log("Error: ", error.message);
  } else {
    products = data?.products?.data;
  }

  return (
    <div className="mb-10">
      <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
        <h1 className="bolder font-bold text-3xl">LATEST BOOK</h1>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-[5rem] gap-y-8">
          {loading ? (
            <div className="flex flex-auto w-full justify-center items-center">
              <Spinner size={60} />
            </div>
          ) : (
            products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  avatar={product.avatar}
                  name={product.name}
                  score={5}
                  price={product.price}
                  description={product.description}
                  address={product.address}
                  priceSale={product.priceSale}
                  isOnSale={product.isOnSale}
                  categoryId={""}
                  publisherId={""}
                  author={""}
                  images={[]}
                  status={""}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
