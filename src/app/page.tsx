'use client';

import {ProductList} from "@/src/components/ProductsList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReviewsList} from "@/src/components/ReviewsList";
import {useState} from "react";
import {CartSummary} from "@/src/components/CardSummary";
import {OrderForm} from "@/src/components/OrderForm";
import {Popup} from "@/src/components/Popup";
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'

export default function Home() {
    const [showSuccess, setShowSuccess] = useState(false);
  return (
      <main className="container mx-auto px-4 pt-2 mt-5">
          <div className={'p-2 w-100 mx-auto rounded-2'}  style={{ backgroundColor: 'var(--bs-body-bg)' }}><h1 className="text-center text-white text-lowercase fw-light" >Тестовое задание</h1></div>

          <section className={'md-10'}>
              <ReviewsList/>
          </section>
          <div className="col-sm-12 col-md-6  mx-auto card p-2"  style={{ backgroundColor: 'var(--bs-secondary)'}}>
              <CartSummary />
              <OrderForm onSuccess={() => setShowSuccess(true)} />
          </div>
          {showSuccess && (
              <>
                  <div className="modal-backdrop fade show"></div>
                  <Popup onClose={() => setShowSuccess(false)} />
              </>)}
        <ProductList />
      </main>
  );
}
