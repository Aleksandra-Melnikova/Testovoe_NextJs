'use client';

export const Popup = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="modal fade show" style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050
        }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: 'white' }}> {/* Добавлен белый фон */}
                    <div className="modal-header">
                        <h5 className="modal-title">Заказ оформлен</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn"
                            style={{backgroundColor: 'var(--bs-primary)', color: 'white'}}
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};