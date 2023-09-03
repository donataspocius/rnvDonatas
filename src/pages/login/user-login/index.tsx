import styles from "../Login.module.scss";
import Button from "../../../app/components/Button/Button";
import Input from "../../../app/components/Input/Input";

interface LoginFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: React.FormEventHandler<HTMLFormElement>;
  error: string;
}

const LoginForm = ({ onChange, onClick, error }: LoginFormProps) => {
  return (
    <div>
      <form onSubmit={onClick} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <Input label="Email " type="email" name="email" onChange={onChange} />
          <Input
            label="Password "
            type="password"
            name="password"
            onChange={onChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <Button type="submit" size="small">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
