import Button from "@/app/common-components/Button";
import { Product } from "../product.interface";

const ProductDetail: React.FC<{
  product: Omit<Product, "id">;
  hasActions?: boolean;
}> = ({ product, hasActions = false }) => {
  return (
    <div className="px-5 py-24">
      <div className="w-full mx-auto flex flex-wrap justify-center">
        <img
          alt={product.description || "Image description"}
          className="lg:w-1/3 w-full lg:h-96 h-64 object-contain object-center rounded"
          src={
            product.image ||
            "https://ih1.redbubble.net/image.219560033.4600/st,small,507x507-pad,600x600,f8f8f8.u6.jpg"
          }
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
            {product.category || "Category"}
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 capitalize">
            {product.title || "Product title"}
          </h1>
          <div className="flex mb-4">
            <span className="flex items-center">
              <span className="text-gray-600 ml-1">
                {product.rating?.rate || 5}
              </span>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 text-indigo-500 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-gray-600 ml-4">
                {product.rating?.count || 100} ratings
              </span>
            </span>
          </div>
          <p className="leading-relaxed">
            {product.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum hic accusamus nihil placeat, laudantium beatae esse dolorem sapiente numquam cum sequi laborum vitae, debitis omnis ea modi officiis asperiores ipsam."}{" "}
          </p>
          <div className="mt-4">
            <div className="title-font font-medium text-2xl text-gray-900">
              ${product?.price || 0} USD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
