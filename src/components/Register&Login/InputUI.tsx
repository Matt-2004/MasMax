interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  icon: any;
}

const InputUI = (props: IInput) => {
  const { text, icon } = props;

  return (
    <section className='flex flex-col mb-3'>
      <label
        className='pl-2 mb-1 cursor-text text-sm text-[#2eade7] '
        htmlFor={text}
      >
        <section className='flex w-full justify-between'>
          {text} {icon}
        </section>
      </label>
      <input
        {...props}
        id={text}
        type='string'
        className='border-b text-white px-3  bg-[#26262e]  max-w-[22rem]  border-[#2eade7] focus:outline-none focus:border-b-2 '
      />
    </section>
  );
};

export default InputUI;

export function InputContainer({ children }: any) {
  return <form className=''>{children}</form>;
}
