import React from 'react';
import styles from './SuccessModal.module.css';

function SuccessModal({message, onClose}) {
    return (
        <div className={styles.successModal}>
            <div className={styles.successModalContent}>
                <div className={styles.successModalMessage}>
                    {message}
                </div>
                <button onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;
