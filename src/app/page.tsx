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
        <main className="mx-auto pt-2 mt-5" style={{
            maxWidth: '1200px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)'
        }}>
            <div className={'p-2 w-100 mx-auto rounded-2 '} style={{
                backgroundColor: 'var(--bs-body-bg)',
                maxWidth: '70%'
            }}>
                <h1 className="text-center text-white text-lowercase fw-light">Тестовое задание</h1>
            </div>

            <div className="row justify-content-center g-4">
                <section className="col-12 px-sm-2 px-md-3">
                    <ReviewsList/>
                </section>
                <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-7 px-sm-2">
                    <div className="card p-2 p-sm-3" style={{ backgroundColor: 'var(--bs-secondary)' }}>

                            <>
                                <CartSummary />
                                <OrderForm onSuccess={() => setShowSuccess(true)} />
                            </>

                    </div>
                </div>

                <div className="col-12 px-sm-2">
                    <ProductList />
                </div>
            </div>

            {showSuccess && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <Popup onClose={() => setShowSuccess(false)} />
                </>
            )}
        </main>
    );
}