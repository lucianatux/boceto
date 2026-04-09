/*
  Modal de confirmación personalizado que reemplaza al confirm() nativo
  del navegador, integrándose visualmente con el diseño del sitio.
*/
export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <i className="material-icons">warning_amber</i>
        </div>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button
            className="confirm-btn confirm-btn-delete"
            onClick={onConfirm}
          >
            Eliminar
          </button>
          <button className="confirm-btn confirm-btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
