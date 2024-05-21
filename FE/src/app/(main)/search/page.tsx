import ProductCard from "@/components/ui/product-card";
import products from "@/draft/products";

export default function Search() {
  return (
    <>
      <div className="text-center w-full">
        <h1 className="mt-5 mb-3 text-3xl">
          Your search for "laptop" revealed the following:
        </h1>

        <div className="mx-auto w-32 border-b border-gray-500"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-5 mb-5">
          {products.map((product) => {
            return (
              <ProductCard
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
    </>
  );
}
