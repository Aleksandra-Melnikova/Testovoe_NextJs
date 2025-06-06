'use client';

import {ProductList} from "@/src/components/ProductsList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReviewsList} from "@/src/components/ReviewsList";
import {useState} from "react";
import {CartSummary} from "@/src/components/CardSummary";
import {OrderForm} from "@/src/components/OrderForm";
import {Popup} from "@/src/components/Popup";
import {useProducts} from "@/src/hooks/useProduct";


export default function Home() {
    const [showSuccess, setShowSuccess] = useState(false);
    const { products } = useProducts();
  return (
      <main className="container mx-auto px-4 py-8" style={{backgroundColor:'#222222'}}>
          <h2 className="text-center my-3 text-secondary">Тестовое задание</h2>
          <section className={'md-10'}>
              <ReviewsList/>
          </section>
          <div className="col-md-4">
              <CartSummary products={products} />
              <OrderForm onSuccess={() => setShowSuccess(true)} />
          </div>
          {showSuccess && (
              <div className="modal-backdrop show">
                  <Popup onClose={() => setShowSuccess(false)} />
              </div>)}
        <ProductList />
      </main>
  );
}
