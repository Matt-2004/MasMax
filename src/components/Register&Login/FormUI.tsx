const FormUI = ({ children }: any) => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-white'>
      <div className='w-[65rem] h-[40rem] shadow-2xl rounded-lg bg-[#26262e]'>
        {children}
      </div>
    </div>
  );
};

export default FormUI;
