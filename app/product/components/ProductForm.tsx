import Button from "@/app/common-components/Button";
import Input from "@/app/common-components/Input";
import Select from "@/app/common-components/Select";
import { useProducts } from "@/app/context/ProductProvider";
import { Product } from "../product.interface";

type ProductFormProps = {
  title: string;
  buttonText: string;
  values?: Omit<Product, "id"> | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
};

const ProductForm = ({
  title,
  buttonText,
  values,
  onSubmit,
  onChange,
}: ProductFormProps) => {
  const {
    state: { categories },
  } = useProducts();

  return (
    <div className="bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
      <h2 className="text-font-primary text-2xl font-bold title-font mb-5">
        {title}
      </h2>
      <form action="submit" onSubmit={onSubmit}>
        <div className="relative mb-4">
          <label htmlFor="category" className="leading-7 text-sm text-gray-600">
            Categoría
          </label>
          <Select
            options={categories}
            onChange={onChange}
            value={values?.category}
          />
        </div>
        <Input
          id="title"
          label="Titulo"
          value={values?.title}
          onChange={onChange}
        />
        <div className="flex gap-2">
          <Input
            id="rate"
            label="Rating"
            type="number"
            value={values?.rating?.rate}
            onChange={onChange}
          />
          <Input
            type="number"
            id="count"
            label="Count"
            value={values?.rating?.count}
            onChange={onChange}
          />
        </div>
        <div className="relative mb-4 flex flex-col">
          <label
            htmlFor="description"
            className="leading-7 text-sm text-gray-600"
          >
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            value={values?.description}
            onChange={onChange}
            className="rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <Input
          id="price"
          label="Precio"
          type="number"
          value={values?.price}
          onChange={onChange}
        />
        <Input
          id="image"
          label="Url de imágen"
          type="url"
          value={values?.image}
          onChange={onChange}
        />
        <Button className="!bg-primary text-white w-full">{buttonText}</Button>
      </form>
    </div>
  );
};

export default ProductForm;
