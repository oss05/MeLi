type SelectProps = {
  options: string[];
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <select
      name="category"
      id="category"
      className="border rounded-md p-2 w-full"
      onChange={onChange}
      value={value}
    >
      <option value="">Selecciona una opción</option>
      {options?.map((option) => (
        <option
          key={option}
          defaultValue={value}
          value={option}
          className="capitalize"
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
