export default function Input({
  label,
  htmlFor,
  type,
  placeholder,
  required,
  errorText,
  value,
  onChange,
  rows,
  cols,
}) {
  const inputIsTextarea = type === "textarea";
  const input = inputIsTextarea ? (
    <textarea
      value={value}
      name={htmlFor}
      onChange={onChange}
      className="px-2 py-2 rounded border block mt-1 border-gray-400 w-full resize-none"
      placeholder={placeholder}
      required={required}
      id=""
      cols={cols || 30}
      rows={rows || 6}
    ></textarea>
  ) : (
    <input
      value={value}
      onChange={onChange}
      name={htmlFor}
      type={type}
      className="px-2 py-2 rounded border block mt-1 border-gray-400 w-full"
      placeholder={placeholder}
      required={required}
    />
  );

  return (
    <div className="mt-4">
      <label htmlFor={htmlFor} className="font-semibold block">
        {label}
      </label>
      {input}
      <p>{errorText}</p>
    </div>
  );
}
