import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ title, content, actions, onDissmiss }) {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={onDissmiss}>
      <div
        className="ui standard modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}

export default Modal;
