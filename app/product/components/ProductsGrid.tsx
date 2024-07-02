import { Product } from "../product.interface";

type ProductsGridProps = {
  products: Product[];
  onClick: (product: Product) => void;
};

const ProductsGrid = ({ products, onClick }: ProductsGridProps) => {
  return (
    <div className="flex flex-wrap lg:-mx-4 gap-4">
      {products?.map((product) => {
        return (
          <div
            className="lg:w-[calc(25%-1rem)] md:w-[calc(50%-1rem)] p-4 w-full border rounded-md cursor-pointer"
            key={product.id}
            onClick={() => onClick(product)}
          >
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt={product.description}
                className="object-contain object-center w-full h-full block"
                src={product.image}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 capitalize">
                {product.category}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium truncate">
                {product.title}
              </h2>
              <p className="mt-1">${product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
