interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  icon?: React.ReactNode;
  error?: string;
}

const InputUI = (props: IInput) => {
  const { text, icon, error, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label
        htmlFor={text}
        className="text-xs font-semibold text-white/50 uppercase tracking-wider font-roboto"
      >
        {text}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={text}
          className={`w-full bg-white/5 border ${
            error
              ? "border-red-500/70"
              : "border-white/10 focus:border-[#2eade7]/70"
          } rounded-xl px-4 py-2.5 text-white text-sm font-roboto outline-none transition-colors duration-200 placeholder:text-white/45 pr-9`}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base leading-none">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-xs font-roboto mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default InputUI;

export function InputContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
