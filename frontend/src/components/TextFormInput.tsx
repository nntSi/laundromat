type Props = {
  placeholder?: string;
  type?: "text" | "password";
};

const TextFormInput = ({ placeholder, type }: Props) => {
  return (
    <div>
      <input
        type={type ? type : "text"}
        className="py-2.5 px-3 ring-1 text-base bg-zinc-50 ring-zinc-300 rounded w-full"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextFormInput;
