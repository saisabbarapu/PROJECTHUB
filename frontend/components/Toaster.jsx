import React, { useContext } from 'react';
import styles from './Toaster.module.css';
import { ToasterContext } from './ToasterContext';

const Toaster = () => {
  const { toasts, removeToast } = useContext(ToasterContext);

  return (
    <div className={styles.toasterContainer}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toaster; 