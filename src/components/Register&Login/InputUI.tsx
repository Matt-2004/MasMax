interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const InputUI = (props: IInput) => {
  const { text } = props;

  return (
    <div className='flex flex-col mb-3'>
      <label
        className='pl-2 mb-1 cursor-text text-sm text-[#2eade7] '
        htmlFor={text}
      >
        {text}
      </label>
      <input
        id={text}
        type='string'
        className='border-b text-white px-3  bg-[#26262e]  w-[22rem]  border-[#2eade7] focus:outline-none focus:border-b-2 '
        {...props}
      />
    </div>
  );
};

export default InputUI;

export function InputContainer({ children }: any) {
  return <form className=''>{children}</form>;
}
