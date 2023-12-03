import React from "react";
import styles from "./Toast.module.scss";

interface ToastPropsType {
  text: string;
}

export default function Toast(props: ToastPropsType) {
  return (
    <div className={styles.container}>
      <p>{props.text}</p>{" "}
    </div>
  );
}
