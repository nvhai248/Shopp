import React from "react";
import ToTalCart from "./components/total";
import CartElement from "./components/cartElement";

export default function PaymentMethods() {
  return (
    <section className="h-full bg-gradient-to-r w-full text-start">
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center my-4">
          <div className="w-2/3">
            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="py-3 px-4 bg-gray-100 rounded-none">
                <h5 className="text-xl font-semibold mb-0">Cart - 2 items</h5>
              </div>
              <div className="p-4">
                <CartElement />
                <hr className="my-4" />

                <div className="flex flex-wrap mb-4">
                  <div className="lg:w-1/4 w-full mb-4 lg:mb-0">
                    <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                        className="w-full"
                        alt="Red hoodie"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
                    <p className="font-semibold">Red hoodie</p>
                    <p>Color: red</p>
                    <p>Size: M</p>
                    <div className="flex space-x-2">
                      <button
                        className="text-sm text-gray-600 hover:text-gray-800"
                        title="Remove item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        title="Move to the wish list"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="lg:w-1/4 w-full">
                    <div className="flex mb-4">
                      <button className="px-3 py-1 border border-gray-300 rounded-l">
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        className="w-16 text-center border-t border-b border-gray-300"
                        defaultValue={1}
                        min={0}
                      />
                      <button className="px-3 py-1 border border-gray-300 rounded-r">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <p className="text-center font-semibold">$17.99</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="p-4">
                <p className="font-semibold">Expected shipping delivery</p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>

            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="p-4">
                <p className="font-semibold">We accept</p>
                <div className="flex space-x-2">
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>
            </div>
          </div>

          <ToTalCart />
        </div>
      </div>
    </section>
  );
}
