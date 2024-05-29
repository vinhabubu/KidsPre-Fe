import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "store/Toast/action";

function ToastComponent() {
  const { toasts } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onSetToast = (body) => dispatch(setToast(body));

  return (
    <ToastContainer
      position="top-end"
      className="p-3 position-fixed"
      style={{ zIndex: 3101 }}
    >
      {toasts.map((toast, index) => (
        <Toast
          key={toast.key}
          autohide
          delay={3000}
          className={`mb-3 bg-${toast.type}`}
          onClose={() => {
            const newToasts = toasts.filter((item) => item.key !== toast.key);
            onSetToast(newToasts);
          }}
        >
          <Toast.Header>
            <small className="ms-auto">{toast.title ? toast.title : ""}</small>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.text}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default ToastComponent;
