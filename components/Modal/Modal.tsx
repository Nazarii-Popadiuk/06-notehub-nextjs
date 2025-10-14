import { useEffect, type ReactNode } from "react";
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'



export interface NotesModalProps {
    children: ReactNode
    onClose: () => void;
}

export default function NotesModal({ children, onClose }: NotesModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        }
    }, [onClose])
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget)
            onClose();
    }

    return createPortal(
        <div
  className={styles.backdrop}
  role="dialog"
            aria-modal="true"
            onClick={handleModalClick}
>
            <div className={styles.modal}>
                {children}
  </div>
        </div>,
        document.body
    )
}