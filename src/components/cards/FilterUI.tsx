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
        className='bg-gradient-to-r from-[#2eade7] to-[#1a8fc7] text-white text-sm h-[2.4rem] items-center cursor-pointer flex justify-between font-roboto font-semibold px-4 py-2 rounded-lg gap-2 hover:from-[#1a8fc7] hover:to-[#2eade7] transition-all duration-200'
      >
        <div>{select}</div>
        <span className='text-xs opacity-80'>{icon}</span>
      </div>
      <ul
        ref={dropDownRef}
        className='text-white hidden border border-[#2eade7]/40 cursor-pointer rounded-lg font-roboto bg-[#1e1e26] w-[9rem] py-1 z-30 text-center overflow-hidden'
      >
        {FilterType.map((types, i) => (
          <li
            key={i}
            onClick={(e) => navi(e, types.path)}
            className='py-2 px-3 hover:bg-[#2eade7]/20 hover:text-[#2eade7] transition-colors duration-150 text-sm'
          >
            {types.label}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterUI;
