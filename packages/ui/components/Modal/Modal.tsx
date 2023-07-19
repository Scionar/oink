import FocusTrap from 'focus-trap-react';
import { Button } from '../Button/Button';
import styles from './Modal.module.css';

type ModalProps = {
  children: any;
  closeHandler: () => void;
};

export const Modal = ({ children, closeHandler }: ModalProps) => (
  <FocusTrap>
    <dialog className={styles.modal}>
      <div className={styles.actions}>
        <Button onClick={closeHandler}>Close</Button>
      </div>
      <div className={styles.content}>{children}</div>
    </dialog>
  </FocusTrap>
);
