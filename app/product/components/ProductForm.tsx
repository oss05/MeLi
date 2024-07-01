import Button from "@/app/common-components/Button";
import Input from "@/app/common-components/Input";
import Select from "@/app/common-components/Select";
import { useProducts } from "@/app/context/ProductProvider";

type ProductFormProps = {
  title: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: () => void;
};

const ProductForm = ({
  title,
  buttonText,
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
          <Select options={categories} onChange={onChange} />
        </div>
        <Input id="title" label="Titulo" onChange={onChange} />
        <div className="flex gap-2">
          <Input id="rate" label="Rating" type="number" onChange={onChange} />
          <Input type="number" id="count" label="Count" onChange={onChange} />
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
            onChange={onChange}
            className="rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <Input id="price" label="Precio" type="number" onChange={onChange} />
        <Input
          id="image"
          label="Url de imágen"
          type="url"
          onChange={onChange}
        />
        <Button className="!bg-primary text-white w-full">{buttonText}</Button>
      </form>
    </div>
  );
};

export default ProductForm;
