type SelectProps = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select
      name="category"
      id="category"
      className="border rounded-md p-2 w-full"
      onChange={onChange}
    >
      <option value="">Selecciona una opción</option>
      {options?.map((option) => (
        <option value={option} className="capitalize">
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
