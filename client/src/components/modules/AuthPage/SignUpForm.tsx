import { FC, useState } from "react";
import styles from "@/styles/auth/index.module.scss";
import NameInput from "@/components/ui/AuthPage/NameInput";
import EmailInput from "@/components/ui/AuthPage/EmailInput";
import PasswordInput from "@/components/ui/AuthPage/PasswordInput";
import { useForm } from "react-hook-form";
import { IInputs } from "@/types/auth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { toast } from "react-toastify";
import spinnerStyles from "@/styles/spinner/index.module.scss";
import { showAuthError } from "@/utils/error";
import { useTheme } from "@/hooks/useTheme";

interface ISignUpProps {
  switchForm: () => void;
}

const SignUpForm: FC<ISignUpProps> = ({ switchForm }) => {
  const [spinner, setSpinner] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>();

  const { theme, changeTheme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

  const { signUp } = useActions();

  const onSubmit = async (data: IInputs) => {
    try {
      const response = await signUp(data);
      console.log(response);

      if (!response) {
        return;
      }

      resetField("email");
      resetField("username");
      resetField("password");
      switchForm();
    } catch (err) {
      showAuthError(err);
    }
  };
  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : "SIGN UP"}
      </button>
    </form>
  );
};

export default SignUpForm;
