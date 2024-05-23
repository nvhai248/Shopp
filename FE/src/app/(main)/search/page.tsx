import ProductCard from "@/components/ui/product-card";
import products from "@/draft/products";
import { NavFilter } from "./navbar";

export default function Search() {
  return (
    <div className="flex">
      <NavFilter />
      <div className="w-3/4 p-5">
        <h1 className="text-center text-3xl mb-5">
          Your search for "laptop" revealed the following:
        </h1>
        <div className="mx-auto w-32 border-b border-gray-500 mb-5"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                img={product.img}
                title={product.title}
                score={product.score}
                price={product.price}
                description={product.description}
                address={product.address}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
