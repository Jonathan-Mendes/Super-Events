import React, { useState, useRef, useEffect } from 'react';

class Comprar {

    Product({ price, name }) {
        const [paidFor, setPaidFor] = useState(false);
        const [error, setError] = useState(null);
        const paypalRef = useRef();

        useEffect(() => {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: name,
                                    amount: {
                                        currency_code: 'BRL',
                                        value: price,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true);
                        console.log(order);
                    },
                    onError: err => {
                        setError(err);
                        console.error(err);
                    },
                })
                .render(paypalRef.current);
        }, [name, price]);

        if (paidFor) {
            return (
                <div>
                    <h1>Parabéns, você acabou de comprar um ingresso para {name}!</h1>
                </div>
            );
        }

        return (
            <div>
                {error && <div>Uh oh, an error occurred! {error.message}</div>}
                <h1>
                    {name} for ${price}
                </h1>
                <img alt={name}width="200" />
                <div ref={paypalRef} />
            </div>
        );
    }

    // App() {
    //     const product = {
    //         price: 777.77,
    //         name: 'comfy chair',
    //         description: 'fancy chair, like new',
    //     };

        // return (
        //     <div className="App">
        //         <Product product={product} />
        //     </div>
        // );
    // }
}
export default new Comprar();
