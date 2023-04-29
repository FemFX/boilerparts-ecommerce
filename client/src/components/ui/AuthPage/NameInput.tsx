import { FC } from "react";
import { IAuthPageInput } from "@/types/auth";
import styles from "@/styles/auth/index.module.scss";

const NameInput: FC<IAuthPageInput> = ({ register, errors }) => (
  <label className={styles.form__label}>
    <input
      {...register("username", {
        required: "Введите имя!",
        minLength: 2,
        maxLength: 15,
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: "Недопустимое значение!",
        },
      })}
      className={styles.form__input}
      type="text"
      placeholder="Name"
    />
    {errors.username && (
      <span className={styles.error_alert}>{errors.username?.message}</span>
    )}
    {errors.username && errors.username.type === "minLength" && (
      <span className={styles.error_alert}>Минимум 2 символа!</span>
    )}
    {errors.username && errors.username.type === "maxLength" && (
      <span className={styles.error_alert}>Не более 15 символов!</span>
    )}
  </label>
);

export default NameInput;
