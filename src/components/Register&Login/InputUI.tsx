import { useRef } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const InputUI = (props: IInput) => {
  const { text } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  function handleAnimate() {
    if (inputRef.current?.value !== "") {
      labelRef.current?.classList.remove("top-8");
      labelRef.current?.classList.add("top-1");
    } else {
      labelRef.current?.classList.remove("top-1");
      labelRef.current?.classList.add("top-8");
    }
  }
  return (
    <div className='relative'>
      <input
        id={text}
        type='string'
        ref={inputRef}
        onInput={() => handleAnimate()}
        className='border-b text-white pl-1 pt-3 bg-[#26262e]  w-[22rem] py-2 border-[#2eade7] focus:outline-none focus:border-b-2 mt-5 peer'
        {...props}
      />
      <label
        ref={labelRef}
        className='absolute left-1 cursor-text top-8 text-[#2eade7] peer-focus:text-[#2eade7] peer-focus:top-1 peer-focus:text-sm transition-all'
        htmlFor={text}
      >
        {text}
      </label>
    </div>
  );
};

export default InputUI;

export function InputContainer({ children }: any) {
  return <form className=''>{children}</form>;
}
