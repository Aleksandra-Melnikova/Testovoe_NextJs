'use client';

export const Popup = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="modal show bg-white" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Заказ оформлен</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};