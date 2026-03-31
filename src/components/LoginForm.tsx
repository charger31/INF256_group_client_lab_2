import { useState } from "react";
import type { PAGE } from "../types/page";
import { sendRequest } from "../utils/api";
import type { LoginPayload } from "../types/api";

interface Props {
  changePage: (page: PAGE) => void;
}

const LoginForm = (props: Props) => {
  const { changePage } = props;

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    //Need to send the data to the server here
    if (name.length > 0 && password.length > 0) {
      //Send the data up
      const body = new URLSearchParams({
        name,
        password,
      });
      const response = await sendRequest("/user", "POST", body);
      if (response.ok) {
        const data: LoginPayload = await response.json();
        if (data.status == "success") {
          localStorage.setItem("jwt", JSON.stringify(data.data.token));
          localStorage.setItem("user", JSON.stringify(data.data.user));
          changePage("GAME");
        }
      } else {
        console.log("Set the error here: ");
      }
    }
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:{" "}
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={() => onSubmit()}>Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
