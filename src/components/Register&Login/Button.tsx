import { useEffect, useRef, useState } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading: boolean;
  btnLoader?: boolean;
}

const Button = (props: IButton) => {
  const { text, loading, btnLoader } = props;
  const btnRef = useRef<HTMLButtonElement>(null);

  const enableBtn = () => {
    if (btnRef.current) {
      btnRef.current.disabled = false;
    }
  };

  useEffect(() => {
    if (loading === true) {
      enableBtn();
    }
  });

  return (
    <button
      disabled
      ref={btnRef}
      style={{
        opacity: loading ? 1 : 0.6,
        cursor: loading ? "pointer" : "default",
      }}
      className={`bg-[#2eade7]  flex justify-center relative mt-5 font-roboto text-lg py-2 rounded-sm w-[22rem]`}
      {...props}
    >
      {btnLoader && <p className='absolute left-3 loader ml-4 mt-1'></p>}
      <p>{text}</p>
    </button>
  );
};

export default Button;
