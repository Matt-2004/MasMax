const FormUI = ({ children }: any) => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-white'>
      <div className='xl:w-[65rem] md:w-[40rem] max-sm:w-full max-sm:h-full relative  h-[40rem] shadow-2xl sm:rounded-lg bg-[#26262e]'>
        <div className='w-[100%] max-sm:w-full  flex flex-col justify-evenly h-[100%] items-center'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormUI;
