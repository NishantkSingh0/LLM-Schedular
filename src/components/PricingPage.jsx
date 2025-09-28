import React, { useState } from "react";
import toast from "react-hot-toast";

export default function PricingPage({ initialData }) {
  const [selected, setSelected] = useState(null);

  const CARD_VERTICAL_PADDING = "py-20"; 

  const CARD_WIDTH = "w-72 md:w-56"; 
  
  const CARD_GAP = "gap-2 md:gap-4"; 


  // batch JSON state (keeps track of Tokens). Falls back to sample if no prop passed.
  const defaultBatch = { Type: "batchA", Tokens: 0, id: "batch123" };
  const [batchData, setBatchData] = useState(initialData || defaultBatch);

  const plans = [
    { id: 1, title: "Essential", price: 188.99, storage: "600 GB", users: 4, send: "5 GB", tokens: 10 },
    { id: 2, title: "Deluxe", price: 349.99, storage: "5 TB", users: 10, send: "10 GB", tokens: 30 },
    { id: 3, title: "Premium", price: 499.99, storage: "20 TB", users: 40, send: "100 GB", tokens: 40 },
  ];

  
  const handlePurchase = (tokensToAdd) => {
    const updated = { ...batchData, Tokens: batchData.Tokens + tokensToAdd };
    setBatchData(updated);

   
    console.log("Updated batchData:", updated);

    // toast.error(`Purchased ${tokensToAdd} tokens — New total: ${updated.Tokens}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white p-6">
      {/* Pricing Cards - center card now equal to others. Use the top CONFIG to change height/width/spacing */}
      <div className={`flex items-end justify-center max-w-5xl w-full ${CARD_GAP}`}>
        {plans.map((plan) => {
          const isSelected = selected === plan.id;

          return (
            <div
              key={plan.id}
              onMouseEnter={() => setSelected(plan.id)}
              onMouseLeave={() => setSelected(null)}
              className={`rounded-2xl shadow-lg px-6 ${CARD_VERTICAL_PADDING} flex flex-col items-center transition-all duration-300 border ${CARD_WIDTH} ${
                isSelected
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-4 border-blue-500 -translate-y-10 text-white z-30 shadow-2xl"
                  : "bg-gray-900 border-gray-700 text-gray-200 hover:-translate-y-10 hover:shadow-purple-500/30 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
              }`}
            >
              <h3 className={`text-lg font-semibold mb-3 ${isSelected ? "text-white" : "text-gray-200"}`}>{plan.title}</h3>

              <p className={`text-3xl font-extrabold mb-6 ${isSelected ? "text-white" : "text-gray-200"}`}>
                ${plan.price.toFixed(2)}
              </p>

              <ul className={`text-sm space-y-2 mb-6 text-center ${isSelected ? "text-white/90" : "text-gray-300"}`}>
                <li>{plan.storage} Storage</li>
                <li>{plan.users} Users in total</li>
                <li>Send up to {plan.send}</li>
              </ul>

              <div className="flex justify-center w-full mt-auto">
                {/* ADDED FUNCTIONALITY: clicking this will increment tokens, log JSON, and show a toast.error */}
                <button
                  onClick={() => handlePurchase(plan.tokens)}
                  className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 bg-white text-purple-700"
                >
                  PURCHASE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
