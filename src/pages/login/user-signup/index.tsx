import React from "react";

import Button from "../../../app/components/Button/Button";
import Input from "../../../app/components/Input/Input";
import styles from "../Login.module.scss";

interface SignUpFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: React.FormEventHandler<HTMLFormElement>;
  error: string;
}

const SignUpForm = ({ onChange, onClick, error }: SignUpFormProps) => {
  return (
    <form className={styles.formContainer} onSubmit={onClick}>
      <div className={styles.inputContainer}>
        <Input label="Username" name="username" onChange={onChange} />
        <Input label="Email" name="email" type="email" onChange={onChange} />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div>
        <Button type="submit" size="small">
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// import styles from '../Login.module.scss';
// import { createUser } from '../../../utils/authFunctions';
// import { updateUserId } from '../../../state/auth/authSlice';
// import { createNewUserInDatabase } from '../../../utils/functions';

// interface InputDataProps {
//     name: string;
//     value: string;
// }

// interface UserDataProps {
//     username?: string;
//     email: string;
//     password: string;
// }

// const initialFormInputs = {
//     email: '',
//     password: '',
// };

// const SignUpForm = () => {
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const [userData, setUserData] = useState<UserDataProps>(initialFormInputs);
//     const [loginError, setLoginError] = useState<string>('');

//     const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//         const { name, value }: InputDataProps = e.target as HTMLInputElement;
//         setUserData((prev) => {
//             return {
//                 ...prev,
//                 [name]: value,
//             };
//         });
//     };

//     const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         createUser(userData, async (userId, error) => {
//             if (userId) {
//                 const createUser = await createNewUserInDatabase(userId);
//                 if (createUser.status === 201) {
//                     dispatch(updateUserId(userId));
//                     router.push('/browse');
//                 }
//             } else {
//                 setLoginError(error!);
//             }
//         });
//     };

//     return (
//         <div className={styles.hero}>
//             <div className={styles.mainContainer}>
//                 <nav>
//                     <Link href="/login/user-login">Login</Link>
//                     <Link href="/login/user-signup">Create Account</Link>
//                 </nav>
//                 <div className={styles.formOutlet}>
//                     <form onSubmit={signUpHandler}>
//                         <input type="text" name="email" value={userData.email} onChange={onChange} />
//                         <input type="password" name="password" value={userData.password} onChange={onChange} />
//                         <button type="submit">Create Account</button>
//                         {loginError && <p>{loginError}</p>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;
