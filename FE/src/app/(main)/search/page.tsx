import ProductCard from "@/components/ui/product-card";
import { NavFilter } from "./navbar";
import { ProductType } from "@/+core/interfaces";
import { SearchProductService } from "@/+core/services";

export default async function Search() {
  const { data, errors } = await SearchProductService({ page: 1, limit: 10 });

  if (errors) {
    console.log("Error: ", errors[0].message);
  }

  const products: ProductType[] = data?.products?.data || [];

  return (
    <div className="flex">
      <NavFilter />
      <div className="w-3/4 p-5 flex flex-col items-center">
        <h1 className="text-center text-3xl mb-5">
          Your search for "laptop" revealed the following:
        </h1>
        <div className="mx-auto w-32 border-b border-gray-500 mb-5"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8">
          {products?.map((product) => {
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
                isOnSale={product.isOnSale}
                categoryId={""}
                publisherId={""}
                author={""}
                images={[]}
                status={""}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
