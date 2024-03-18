import Button from "./Button";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";

const Register = () => {
  return (
    <FormUI>
      <div className='w-[100%] flex justify-evenly h-[100%] items-center'>
        <span className='italic text-center mb-10 text-white w-[30%] font-titillium text-8xl font-semibold'>
          Create a new account
        </span>
        <InputContainer>
          <InputUI text='Username' type='string' />
          <InputUI text='Email' type='email' />
          <InputUI text='Password' type='password' autoComplete='off' />
          <Button text='Register'></Button>
          <div className='text-center font-roboto text-white mt-5'>
            Have an accout?{" "}
            <a href='/login' className='underline text-[#2eade7]'>
              Login here.
            </a>
          </div>
        </InputContainer>
      </div>
    </FormUI>
  );
};

export default Register;
