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
      labelRef.current?.classList.remove("top-6");
      labelRef.current?.classList.add("top-0");
    } else {
      labelRef.current?.classList.remove("top-0");
      labelRef.current?.classList.add("top-6");
    }
  }
  return (
    <div className='relative'>
      <input
        id={text}
        type='string'
        ref={inputRef}
        onInput={() => handleAnimate()}
        className='border-b text-white pl-1 bg-[#26262e] w-[22rem] py-2 border-[#2eade7] focus:outline-none focus:border-b-2 mt-5 peer'
        {...props}
      />
      <label
        ref={labelRef}
        className='absolute left-1 cursor-text top-6 text-white peer-focus:text-[#2eade7] peer-focus:top-0 peer-focus:text-sm transition-all'
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
