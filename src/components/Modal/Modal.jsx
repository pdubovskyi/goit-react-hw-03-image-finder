import { Component } from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <span className={styles.close}>X</span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
