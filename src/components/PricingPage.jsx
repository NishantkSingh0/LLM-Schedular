import React, { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("annually");

  const plans = {
    annually: [
      { title: "Essential", price: 188.99, storage: "600 GB", users: 4, send: "5 GB" },
      { title: "Deluxe", price: 349.99, storage: "5 TB", users: 10, send: "10 GB" },
      { title: "Premium", price: 499.99, storage: "20 TB", users: 40, send: "100 GB" },
    ],
    monthly: [
      { title: "Essential", price: 19.99, storage: "600 GB", users: 4, send: "5 GB" },
      { title: "Deluxe", price: 34.99, storage: "5 TB", users: 10, send: "10 GB" },
      { title: "Premium", price: 49.99, storage: "20 TB", users: 40, send: "100 GB" },
    ],
  };

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "annually" ? "monthly" : "annually");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6">Our Pricing Plan</h2>

      {/* Toggle Switch */}
      <div className="flex items-center gap-3 mb-10">
        <span className={billingCycle === "annually" ? "font-semibold" : "text-gray-400"}>Annually</span>
        <button
          onClick={toggleBillingCycle}
          className="relative w-14 h-7 bg-purple-600 rounded-full flex items-center px-1 transition duration-300"
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
              billingCycle === "monthly" ? "translate-x-7" : "translate-x-0"
            }`}
          ></div>
        </button>
        <span className={billingCycle === "monthly" ? "font-semibold" : "text-gray-400"}>Monthly</span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {plans[billingCycle].map((plan, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-purple-400 hover:shadow-lg border bg-gray-900 border-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
          >
            <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
            <p className="text-3xl font-extrabold mb-6">${plan.price.toFixed(2)}</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>{plan.storage} Storage</li>
              <li>{plan.users} Users in total</li>
              <li>Send up to {plan.send}</li>
            </ul>
            <button className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-white text-purple-700">
              CLICK TO PURCHASE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
