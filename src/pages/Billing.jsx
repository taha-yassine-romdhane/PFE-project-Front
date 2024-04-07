import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Plus, ShoppingBag } from 'react-feather';

const Billing = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [billingFrequency, setBillingFrequency] = useState('monthly'); // Default to monthly billing
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Function to add a new payment method
  const handleAddPaymentMethod = () => {
    // Implement logic to add a new payment method
    // For example, open a modal to enter payment details
  };

  // Function to remove a payment method
  const handleRemovePaymentMethod = (methodToRemove) => {
    setPaymentMethods(paymentMethods.filter(method => method !== methodToRemove));
    // Implement logic to remove the payment method
  };

  // Function to handle input change in credit card info fields
  const handleCreditCardInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  // Function to handle buy action
  const handleBuy = () => {
    // Implement buy logic here, using credit card information
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Billing</h1>

      {/* Payment methods section */}
      <div className="mb-8">
        {/* Payment methods list */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Methods</h2>
      {/* Add payment method button */}
        <button onClick={handleAddPaymentMethod} className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 mb-4">
          <Plus className="h-5 w-5 mr-2" />
          Add Payment Method
        </button>
        {/* Display payment methods */}
        {paymentMethods.length > 0 ? (
          <ul className="space-y-4">
            {paymentMethods.map((method, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-600 mr-4" />
                  <span className="text-gray-800">{method}</span>
                </div>
                <button onClick={() => handleRemovePaymentMethod(method)}>
                  <span className="text-red-500">Remove</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No payment methods added yet.</p>
        )}
      </div>

      {/* Credit card information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Credit Card Information</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="cardNumber"
            value={creditCardInfo.cardNumber}
            onChange={handleCreditCardInputChange}
            placeholder="Card Number"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          />
          <input
            type="text"
            name="expiryDate"
            value={creditCardInfo.expiryDate}
            onChange={handleCreditCardInputChange}
            placeholder="Expiry Date"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          />
          <input
            type="text"
            name="cvv"
            value={creditCardInfo.cvv}
            onChange={handleCreditCardInputChange}
            placeholder="CVV"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Billing frequency options */}
      <div className="mb-8">
        {/* Display billing frequency options */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Billing Frequency</h2>
        <div className="flex space-x-4">
          {/* Daily billing */}
          <button
            onClick={() => setBillingFrequency('daily')}
            className={`flex items-center px-4 py-2 rounded-md shadow-md focus:outline-none ${billingFrequency === 'daily' ? 'bg-gray-600 text-white px-4 py-2 rounded-md ml-2 shadow-md' : 'bg-gray-200 text-gray-600'}`}
          >
            Daily
          </button>
          {/* Monthly billing */}
          <button
            onClick={() => setBillingFrequency('monthly')}
            className={`flex items-center px-4 py-2 rounded-md shadow-md focus:outline-none ${billingFrequency === 'monthly' ? 'bg-gray-600 text-white px-4 py-2 rounded-md ml-2 shadow-md' : 'bg-gray-200 text-gray-600'}`}
          >
            Monthly
          </button>
          {/* Yearly billing */}
          <button
            onClick={() => setBillingFrequency('yearly')}
            className={`flex items-center px-4 py-2 rounded-md shadow-md focus:outline-none ${billingFrequency === 'yearly' ? 'bg-gray-600 text-white px-4 py-2 rounded-md ml-2 shadow-md' : 'bg-gray-200 text-gray-600'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Buy button */}
      <button onClick={handleBuy} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
        <ShoppingBag className="h-5 w-5 mr-2" />
        Buy
      </button>

      {/* Navigation */}
      <div className="mt-8">
        <Link to="/dashboard" className="text-blue-500 hover:underline">Go back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Billing;


