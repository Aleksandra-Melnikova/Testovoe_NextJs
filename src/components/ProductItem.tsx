'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BuyButton } from "@/src/components/BuyButton";

interface Product {
    id: number;
    title: string;
    price: number;
    image_url?: string;
    description?: string;
}

const ProductItem = React.memo(function ProductItem({ product }: { product: Product }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTWi0JscCs7xkjwsTCoRzZ0zZTWtxb7CI1ZA&s';
    const imageSrc = imageError ? fallbackImage : product.image_url || fallbackImage;

    return (
        <div
            className="card rounded-3 flex-column mx-auto overflow-hidden mt-2 d-flex flex-column"
            style={{
                maxWidth: '321px',
                minWidth: '300px',
                minHeight: '460px',
                height: 'auto',
                backgroundColor: '#D9D9D9'
            }}
        >
            <div style={{ flex: '0 0 auto' }}>
                <Image
                    src={imageSrc}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="card-img-top img-fluid mt-2 rounded-2 mx-auto d-block"
                    style={{
                        minHeight: '200px',
                        maxHeight: '200px',
                        width: 'auto',
                        objectFit: 'contain'
                    }}
                    onError={handleImageError}
                    unoptimized={true}
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
});

ProductItem.displayName = 'ProductItem';

export { ProductItem };