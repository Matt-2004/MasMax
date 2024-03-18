interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = (props: IButton) => {
  const { text } = props;
  return (
    <button
      className='bg-[#2eade7] mt-5 font-roboto text-lg py-2 rounded-sm w-[22rem]'
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
