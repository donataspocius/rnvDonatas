import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../../assets/web_images/reflixLogo.png";
import styles from "./Header.module.scss";
import { NavLink } from "../NavLink/NavLink";
import Button from "../Button/Button";
import { selectUserId, updateUserId } from "../../state/auth/authSlice";
import { logoutUser } from "../../utils/authFunctions";
import { setUserFavorites } from "../../state/content/contentSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const handleLogout = () => {
    logoutUser();
    dispatch(updateUserId(""));
    dispatch(setUserFavorites([]));
  };

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img className={styles.logo} src={logo} alt="company logo" />
      </Link>
      <div className={styles.navContainer}>
        <NavLink href={userId ? "/library" : "/login"}>Library</NavLink>
        <NavLink href={"/movies"}>Browse</NavLink>
        <Button
          to={userId ? "/" : "/login"}
          size={"big"}
          onClick={userId ? handleLogout : undefined}
        >
          {userId ? "Logout" : "Sign in"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
