import { useState } from "react";
import LoginForm from "../components/LoginForm";
import type { PAGE } from "../types/page";
import RegisterForm from "../components/RegisterForm";

interface Props {
  changePage: (page: PAGE) => void;
}

const UserPage = (props: Props) => {
  const { changePage } = props;

  const [loginPage, setLoginPage] = useState<boolean>(true);

  const togglePage = () => {
    setLoginPage(!loginPage);
  };

  return (
    <div>
      <h1>{loginPage ? "LOGIN" : "REGISTER"}</h1>
      {loginPage ? (
        <LoginForm changePage={changePage} />
      ) : (
        <RegisterForm showLogin={togglePage} />
      )}
      <a onClick={() => togglePage()}>
        Go to {loginPage ? "Register Page" : "Login Page"}
      </a>
    </div>
  );
};

export default UserPage;
