import React from 'react';

export type TModalProps = { children?: React.ReactNode; onDimmedClick?: () => void };

function Modal({ children, onDimmedClick }: TModalProps) {
  return (
    <div className="modal-wrap">
      <div className="modal-dimmed" onClick={() => onDimmedClick?.()}></div>
      <div className="modal">{children}</div>
    </div>
  );
}

export default Modal;
