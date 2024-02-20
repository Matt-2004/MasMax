import axios from "axios";
import Cookies from "js-cookie";

interface IUser {
  Login(email: string, password: string, path: void): void;
  Register(username: string, email: string, password: string): void;
}

export class User implements IUser {
  public async Login(email: string, password: string, path: void) {
    await axios.post(
      "http://localhost:8000/db/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    await axios
      .get("http://localhost:8000/db/verification", {
        headers: { Authorization: document.cookie },
        withCredentials: true,
      })
      .then(() => {
        path;
      })
      .catch((err) => console.log("Error", err));
  }
  public Register() {}
}
