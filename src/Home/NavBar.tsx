import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

interface UserDetils {
  username: String;
  email: String;
  _id: String;
}

const NavBar = () => {
  const jwtToken = Cookies.get("token");

  const [user, setUser] = useState<UserDetils>();

  useEffect(() => {
    if (jwtToken) {
      try {
        const emailFromJWT = atob(jwtToken.split(".")[1]);

        const fetchUser = async () => {
          await axios
            .post("http://localhost:8000/db/user", {
              email: emailFromJWT,
            })
            .then((result: any) => setUser(result.data));
        };

        fetchUser();
      } catch {
        throw new Error("Can't acess token");
      }
    }
  }, []);

  return (
    <div className="flex justify-center shadow-md">
      <div className="w-[1512px] h-[70px]  flex justify-between lg:px-8 md:px-3 sm:px-2  max-sm:px-2 items-center drop-shadow-2xl ">
        <div className="font-roboto font-bold text-3xl text-white">
          Mas
          <span className="text-[#0FDDD6]">Max</span>
        </div>
        {jwtToken ? <Profile username={user?.username} /> : <RegisterBtn />}
      </div>
    </div>
  );
};

function Profile({ username }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="gap-2 flex justify-between items-center">
          <div className="w-11 h-11 ">
            <img
              className="rounded-[90%] border-2 border-[#0FDDD6]"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="blank-img"
            />
          </div>
          <span className="text-2xl font-semibold text-white ">{username}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile Setting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Change Profile Image</DropdownMenuItem>
          <DropdownMenuItem>Change Detils</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RegisterBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="font-medium shadow-cyan-500/50 shadow-lg text-white  text-md  px-3 py-1.5 bg-[#0FDDD6]"
    >
      Register
    </button>
  );
}

export default NavBar;
