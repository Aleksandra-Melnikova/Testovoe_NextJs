'use client';
import {BuyButton} from "@/src/components/BuyButton";

export const ProductItem = ({ product }: { product: Product }) => {
    return (
        <div className="card rounded-3 flex-column mx-auto overflow-hidden"
             style={{ maxWidth: '321px', minWidth: '290px', height: '420px', backgroundColor:'#D9D9D9' }}>
            <img
                src={product.image_url}
                alt={product.title}
                className="card-img-top img-fluid mt-2 rounded-2"
                style={{ minHeight: '200px', objectFit: 'contain' }}
            />
            <div className="card-body text-center">
                <h3 className="card-title h5 mb-1">{product.title}</h3>
                <p className="card-text text-muted mb-2">{product.description}</p>
            </div>
            <div className=" fw-bold flex-grow-1 mb-1 text-center">
                <div >Цена: {product.price.toLocaleString()} ₽</div>
                <BuyButton product={product}/></div>
        </div>
    );
};