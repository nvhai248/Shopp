import { ProductType } from "@/+core/interfaces";
import { SearchProductService } from "@/+core/services";
import ProductCard from "@/components/ui/product-card";

export default async function LatestProduct() {
  const { data, errors } = await SearchProductService({
    page: 1,
    limit: 24,
    isOnSale: true,
  });

  if (errors) {
    console.log("Error: ", errors[0].message);
  }

  const products: ProductType[] = data?.products?.data || [];

  return (
    <div className="mb-10">
      <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
        <h1 className="bolder font-bold text-3xl">LATEST BOOK</h1>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-[7rem] gap-y-8 overflow-hidden">
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
