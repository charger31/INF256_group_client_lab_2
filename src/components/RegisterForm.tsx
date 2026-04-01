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

  const onSubmit = async () => {
    //Need to send the data to the server here
    if (name.length > 0 && password.length > 0) {
      //Send the data up
      const body = new URLSearchParams({
        name,
        password,
      });
      const response = await sendRequest("/api/register", "POST", body);
      if (response.ok) {
        showLogin();
      } else {
        console.log("Set the error here");
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

export default RegisterForm;
