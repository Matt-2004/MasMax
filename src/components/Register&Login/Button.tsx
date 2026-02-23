interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button = ({ text, loading, ...rest }: IButton) => {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className='w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#2eade7] to-[#1a8fc7] hover:from-[#1a8fc7] hover:to-[#2eade7] text-white font-roboto font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
    >
      {loading && (
        <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0' />
      )}
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default Button;

