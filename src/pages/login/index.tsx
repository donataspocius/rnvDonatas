import { useState, useEffect, MouseEventHandler } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Login.module.scss";
import LoginForm from "./user-login/index";
import SignUpForm from "./user-signup/index";
import { createUser, signInUser } from "../../app/utils/authFunctions";
import { updateUserId } from "../../app/state/auth/authSlice";
import {
  createNewUserInDatabase,
  getUserFavoriteMovies,
} from "../../app/utils/functions";
import { setUserFavorites } from "../../app/state/content/contentSlice";

interface InputDataProps {
  name: string;
  value: string;
}

interface UserDataProps {
  username?: string;
  email: string;
  password: string;
}

const initialFormInputs = {
  email: "",
  password: "",
};

const LoginPageLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const navigate = useNavigate();
  // const location = useLocation();

  const [userData, setUserData] = useState<UserDataProps>(initialFormInputs);
  const [loginError, setLoginError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("login");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: InputDataProps = e.target as HTMLInputElement;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(userData, async (userId, error) => {
      if (userId) {
        const createUser = await createNewUserInDatabase(userId);
        if (createUser.status === 201) {
          dispatch(updateUserId(userId));
          router.push("/movies");
        }
      } else {
        setLoginError(error!);
      }
    });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(userData, async (userId) => {
      if (userId) {
        dispatch(updateUserId(userId));
        const userData = await getUserFavoriteMovies(userId);
        const userFavorites = userData?.data.data.favoriteMovies;
        dispatch(setUserFavorites(userFavorites));
        router.push("/movies");
      } else {
        setLoginError("Invalid login credentials.");
      }
    });
  };

  const tabClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const tabName = target.textContent;
    setActiveTab(tabName!);
    target.classList.add("active");
    setUserData(initialFormInputs);
  };

  const isLoginSelected = activeTab === "Login";

  return (
    <div className={styles.hero}>
      <div className={styles.mainContainer}>
        <nav>
          <div
            className={`${styles.NavLink} ${
              isLoginSelected ? styles.active : ""
            }`}
            onClick={tabClickHandler}
          >
            Login
          </div>
          <div
            className={`${styles.NavLink} ${
              !isLoginSelected ? styles.active : ""
            }`}
            onClick={tabClickHandler}
          >
            Create Account
          </div>
        </nav>
        <div className={styles.formOutlet}>
          {isLoginSelected ? (
            <LoginForm
              onChange={onChange}
              onClick={loginHandler}
              error={loginError}
            />
          ) : (
            <SignUpForm
              onChange={onChange}
              onClick={signUpHandler}
              error={loginError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPageLayout;
