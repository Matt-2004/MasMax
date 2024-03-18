import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";
import Button from "./Button";

const Login = () => {
  return (
    <FormUI>
      <div className='w-[100%] flex justify-evenly h-[100%] items-center'>
        <span className='italic text-center mb-10 text-white w-[30%] font-titillium text-8xl font-semibold'>
          Login
        </span>
        <InputContainer>
          <InputUI text='Email' type='email' />
          <InputUI text='Password' type='password' autoComplete='off' />
          <Button text='Login'></Button>
          <div className='text-center font-roboto text-white mt-5'>
            Dont' have an accout?{" "}
            <a href='/register' className='underline text-[#2eade7]'>
              Register here.
            </a>
          </div>
        </InputContainer>
      </div>
    </FormUI>
  );
};

export default Login;
