import { useState } from "react";
import { sendRequest } from "../utils/api";
import type { RegisterPayload } from "../types/api";

interface Props {
  showLogin: () => void;
}

const RegisterForm = (props: Props) => {
  const { showLogin } = props;

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const onSubmit = async () => {
    //Need to send the data to the server here
    if (name.length > 0 && password.length > 0 && password2.length > 0) {
      //Send the data up
      const body = new URLSearchParams({
        name,
        password,
        password2,
      });
      const response = await sendRequest("/user/register", "POST", body);
      if (response.ok) {
        const data: RegisterPayload = await response.json();
        if (data.status == "success") {
          showLogin();
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
        <label>
          Retype Password:{" "}
          <input
            type={"password"}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <button onClick={() => onSubmit()}>Log in</button>
      </form>
    </div>
  );
};

export default RegisterForm;
