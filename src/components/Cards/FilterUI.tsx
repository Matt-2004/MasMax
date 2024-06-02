import { SetStateAction, useRef } from "react";

interface Itype {
  label: string;
  id: number;
}

interface IFilterUI {
  FilterType: Itype[];
  icon: React.ReactNode;
  setSelect: React.Dispatch<SetStateAction<string>>;
  select: string;
}

const FilterUI = (props: IFilterUI) => {
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
  return (
    <section
      className='w-[9rem] relative'
      onMouseEnter={() => handleDropDown()}
      onMouseLeave={() => handleDropDown()}
    >
      <div className='text-white border border-slate-500 text-lg h-[2.5rem] items-center cursor-pointer flex justify-between   font-roboto px-6   hover:bg-[#858588]  hover:bg-opacity-30 py-2 rounded-md'>
        <div>{select}</div>
        <span>{icon}</span>
      </div>
      <ul
        ref={dropDownRef}
        className='text-white hidden border border-slate-500 font-roboto bg-[#26262e]  shadow-lg w-[10rem] z-20 top-[80%] left-[-10%] py-1  text-center'
      >
        {FilterType.map((types, i) => (
          <li
            key={i}
            onClick={(e) => setSelect(e.currentTarget.innerHTML)}
            className='py-[9px]  bg-[#26262e] hover:bg-[#858588] px-4'
          >
            {types.label}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterUI;
