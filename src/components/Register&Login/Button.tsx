interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading: boolean;
}

const Button = (props: IButton) => {
  const { text, loading } = props;

  return (
    <button
      disabled
      className={`bg-[#2eade7]  flex justify-center relative mt-5 font-roboto text-lg py-2 rounded-sm w-[22rem]`}
      {...props}
    >
      {loading && <p className='absolute left-3 loader ml-4 mt-1'></p>}
      <p className=' '>{text}</p>
    </button>
  );
};

export default Button;
