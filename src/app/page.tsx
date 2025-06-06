'use client';

import {ProductList} from "@/src/components/ProductsList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReviewsList} from "@/src/components/ReviewsList";
import {useState} from "react";
import {CartSummary} from "@/src/components/CardSummary";
import {OrderForm} from "@/src/components/OrderForm";
import {Popup} from "@/src/components/Popup";

export default function Home() {
    const [showSuccess, setShowSuccess] = useState(false);
  return (
      <main className="container mx-auto px-4 pt-2">
          <h2 className="text-center mt-3 pt-2 text-secondary">Тестовое задание</h2>
          <section className={'md-10'}>
              <ReviewsList/>
          </section>
          <div className="col-sm-12 col-md-6  mx-auto card p-2">
              <CartSummary />
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
