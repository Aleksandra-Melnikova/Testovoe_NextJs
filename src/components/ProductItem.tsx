'use client';
import { useState } from 'react';
import { BuyButton } from "@/src/components/BuyButton";

export const ProductItem = ({ product }: { product: Product }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="card rounded-3 flex-column mx-auto overflow-hidden mt-2"
             style={{ maxWidth: '321px', minWidth: '300px', height: '420px', backgroundColor:'#D9D9D9' }}>
                <img
                    src={imageError ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTWi0JscCs7xkjwsTCoRzZ0zZTWtxb7CI1ZA&s' :product.image_url}
                    alt={product.title}
                    className="card-img-top img-fluid mt-2 rounded-2"
                    style={{ minHeight: '200px', objectFit: 'contain' }}
                    onError={handleImageError}
                />
            <div className="card-body text-center">
                <h3 className="card-title h5 mb-1">{product.title}</h3>
                <p className="card-text text-muted mb-2">{product.description}</p>
            </div>
            <div className="fw-bold mt-auto text-center">
                <div>Цена: {product.price.toLocaleString()} ₽</div>
                <BuyButton product={product}/>
            </div>
        </div>
    );
};