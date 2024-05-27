// components/DynamicFormFields.jsx
import React, { useState } from 'react';

const DynamicFormFields = ({ categoryType, handleInputChange }) => {
  const [visibleFields, setVisibleFields] = useState({});

  const handleCheckboxChange = (fieldName) => {
    setVisibleFields((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const renderFields = (fields) => {
    return fields.map(({ label, name }) => (
      <div key={name} className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(name)}
          className="mr-2"
        />
        {visibleFields[name] && (
          <input
            type="text"
            name={name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        )}
      </div>
    ));
  };

  const fields = {
    car: [
      { label: 'ID', name: 'ID' },
      { label: 'Assurance', name: 'assurance' },
      { label: 'Taxes', name: 'taxes' },
      { label: 'Visite Technique', name: 'visiteTechnique' },
      { label: 'Carte Grise', name: 'carteGrise' },
      { label: 'Type Voiture', name: 'typeVoiture' },
    ],
    house: [
        { label: 'ID', name: 'ID' },
      { label: 'Owner', name: 'owner' },
      { label: 'Address', name: 'address' },
      { label: 'Value', name: 'value' },
    ],
    dept: [
        { label: 'ID', name: 'ID' },
      { label: 'Amount', name: 'amount' },
      { label: 'Interest Rate', name: 'interestRate' },
      { label: 'Term', name: 'term' },
    ],
    entreprise: [
        { label: 'ID', name: 'ID' },
      { label: 'Company Name', name: 'companyName' },
      { label: 'Registration Number', name: 'registrationNumber' },
      { label: 'Address', name: 'address' },
    ],
  };

  return categoryType ? renderFields(fields[categoryType]) : null;
};

export default DynamicFormFields;
