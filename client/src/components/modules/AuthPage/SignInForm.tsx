import { FC, useState } from "react";
import styles from "@/styles/auth/index.module.scss";
import NameInput from "@/components/ui/AuthPage/NameInput";
import PasswordInput from "@/components/ui/AuthPage/PasswordInput";
import { useForm } from "react-hook-form";
import { IInputs } from "@/types/auth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { toast } from "react-toastify";
import spinnerStyles from "@/styles/spinner/index.module.scss";
import { showAuthError } from "@/utils/error";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/router";

const SignInForm: FC = ({}) => {
  const [spinner, setSpinner] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>();

  const { theme, changeTheme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

  const { login } = useActions();

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);
      const response = await login(data);
      // console.log(response);

      resetField("username");
      resetField("password");
      router.push("/dashboard");
    } catch (err) {
      showAuthError(err);
    } finally {
      setSpinner(false);
    }
  };
  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        Войти в аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : "LOGIN"}
      </button>
    </form>
  );
};

export default SignInForm;
