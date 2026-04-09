import { useEffect } from "react";

/*
  Componente de notificación tipo toast que aparece brevemente
  para dar feedback visual al usuario tras una acción (guardar, editar, eliminar).
*/
export const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon =
    type === "success"
      ? "check_circle"
      : type === "error"
        ? "error"
        : "info";

  return (
    <div className={`toast-notification toast-${type}`}>
      <i className="material-icons toast-icon">{icon}</i>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        <i className="material-icons">close</i>
      </button>
    </div>
  );
};