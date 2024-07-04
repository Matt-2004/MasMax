import { SetStateAction, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Itype {
  label: string;
  id?: number | null;
  path?: string | null;
}

interface IFilterUI {
  FilterType: Itype[];
  icon: React.ReactNode;
  setSelect: React.Dispatch<SetStateAction<string>>;
  select: string;
}

const FilterUI = (props: IFilterUI) => {
  const navigator = useNavigate();
  const { FilterType, icon, select, setSelect } = props;
  const dropDownRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef(false);

  function handleDropDown() {
    triggerRef.current = !triggerRef.current;
    const select = triggerRef.current;

    if (dropDownRef.current) {
      dropDownRef.current.style.position = select ? "absolute" : "";
      dropDownRef.current.style.display = select ? "block" : "none";
    }
  }

  function navi(e: any, path: any | null) {
    setSelect(e.currentTarget.innerHTML);
    navigator(path);
  }
  return (
    <section
      className='w-[9rem] relative'
      onMouseEnter={() => handleDropDown()}
      onMouseLeave={() => handleDropDown()}
    >
      <div
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        className='bg-[#2eade7] text-[#26262e]  text-lg h-[2.5rem] items-center  cursor-pointer flex justify-around   font-roboto px-5  py-2 rounded-lg'
      >
        <div>{select}</div>
        <span className='text-sm mt-1'>{icon}</span>
      </div>
      <ul
        ref={dropDownRef}
        className='text-white hidden h-[5rem]  border border-[#2eade7] cursor-pointer  rounded-lg  font-roboto bg-[#26262e] w-[9rem] py-[3px] z-30  text-center'
      >
        {FilterType.map((types, i) => (
          <li
            key={i}
            onClick={(e) => navi(e, types.path)}
            className='  bg-[#26262e] py-1   hover:bg-[#858588] '
          >
            {types.label}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterUI;
