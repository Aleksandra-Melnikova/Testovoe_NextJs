'use client';
import {BuyButton} from "@/src/components/BuyButton";

export const ProductItem = ({ product }: { product: Product }) => {
    return (
        <div className="card border-2 border-gray-600 rounded-3 flex-column mx-auto"
             style={{ width: '321px', height: '400px', backgroundColor:'#D9D9D9' }}>
            <img
                src={product.image_url}
                alt={product.title}
                className="card-img-top img-fluid p-3 rounded-2"
                style={{ minHeight: '200px', objectFit: 'contain' }}
            />
            <div className="card-body text-center">
                <h3 className="card-title h5 mb-2">{product.title}</h3>
                <p className="card-text text-muted mb-3">{product.description}</p>
            </div>
            <div className="h5 fw-bold mt-auto text-center">Цена: {product.price.toLocaleString()} ₽</div>
            <BuyButton product={product}/>
        </div>
    );
};