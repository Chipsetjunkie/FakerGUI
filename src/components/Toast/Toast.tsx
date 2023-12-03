import styles from "./Toast.module.scss";

interface ToastPropsType {
  text: string;
  type?: "success" | "error";
}

export default function Toast({ text, type = "success" }: Readonly<ToastPropsType>) {
  return (
    <div
      className={`${styles.container} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      <p>{text}</p>{" "}
    </div>
  );
}
