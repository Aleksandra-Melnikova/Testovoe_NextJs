'use client';
import { useCart } from "@/src/hooks/useCart";


export const CartSummary = ({ products }: { products: Product[] }) => {
    const { cart } = useCart();

    const cartItems = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...item,
            name: product?.title || 'Неизвестный товар',
            price: product?.price || 0,
            itemTotal: (product?.price || 0) * item.quantity
        };
    });

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

    return (
        <div className="card mb-4 mx-auto">
            <div className="card-body">
                <h5 className="card-title">Корзина</h5>
                <div className="mb-3">
                    {cartItems.map(item => (
                        <div key={item.id} className="d-flex justify-content-between mb-2">
                            <div>
                                <span className="fw-medium">{item.name}</span>
                                <span className="text-muted ms-2">x{item.quantity}</span>
                            </div>
                            <div>
                                {(item.itemTotal).toLocaleString()} ₽
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-top pt-2">
                    <div className="d-flex justify-content-between">
                        <span>Товаров:</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <span>Общая сумма:</span>
                        <span>{totalPrice.toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
};