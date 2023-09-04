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
