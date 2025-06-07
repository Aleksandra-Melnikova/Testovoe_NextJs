'use client';
import { useState } from 'react';
import { BuyButton } from "@/src/components/BuyButton";

export const ProductItem = ({ product }: { product: Product }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <div className="card rounded-3 flex-column mx-auto overflow-hidden mt-2 d-flex flex-column"
             style={{
                 maxWidth: '321px',
                 minWidth: '300px',
                 height: '420px',
                 backgroundColor: '#D9D9D9'
             }}>
            <div style={{ flex: '0 0 auto' }}>
                <img
                    src={imageError ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTWi0JscCs7xkjwsTCoRzZ0zZTWtxb7CI1ZA&s' : product.image_url}
                    alt={product.title}
                    className="card-img-top img-fluid mt-2 rounded-2 mx-auto d-block"
                    style={{
                        minHeight: '200px',
                        maxHeight: '200px',
                        width: 'auto',
                        objectFit: 'contain'
                    }}
                    onError={handleImageError}
                />
            </div>

            <div className="card-body text-center d-flex flex-column" style={{ flex: '1 1 auto' }}>
                <h3 className="card-title h5 mb-2">{product.title}</h3>
                <p className="card-text text-muted mb-3 flex-grow-1">{product.description}</p>

                <div className="mt-auto">
                    <div className="fw-bold mb-3">Цена: {product.price.toLocaleString()} ₽</div>
                    <div className="px-3 pb-2">
                        <BuyButton product={product}/>
                    </div>
                </div>
            </div>
        </div>
    );
};