import axios from "axios";

interface IUser {
  Login(email: string, password: string, path: void): void;
  Register(username: string, email: string, password: string): void;
}

export class User implements IUser {
  public async Login(email: string, password: string, path: void) {
    await axios.post(
      "https://mas-max-6ywh.vercel.app/db/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    await axios
      .get("https://mas-max-6ywh.vercel.app/db/verification", {
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
