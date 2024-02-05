import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className=' bg-[#131F22] mt-10 h-[350px] w-[100%] flex justify-center'>
      <div className='flex w-[90%] items-center justify-center'>
        <div className='flex w-[60%] justify-between'>
          <h1 className='font-serif font-bold pt-10 text-4xl text-white'>
            Creating First Big Project
          </h1>
          <div className='relative'>
            <div className='w-[200px] z-20 h-[200px]  bg-[#17262B]'>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className='z-10 inset-0 w-[200px]  h-[200px]  bg-[#262F2D]' />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
