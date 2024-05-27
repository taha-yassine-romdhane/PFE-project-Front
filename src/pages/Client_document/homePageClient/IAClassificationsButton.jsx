import React, { useState } from 'react';
import { MdOutlineDocumentScanner } from 'react-icons/md';

const IAClassificationsButton = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/run-script');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setResult(result);
            await storeGeneratedTexts(result);
        } catch (error) {
            setError(error.toString());
            console.error('Error running script:', error);
        }
    };

    const storeGeneratedTexts = async (data) => {
        try {
            for (const item of data) {
                const response = await fetch('http://localhost:8000/api/store-generated-texts', { // Update the URL to your Laravel backend
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        pdf_path: item.pdf_path,
                        generated_texts: item.generated_texts,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            }
            console.log('Generated texts stored successfully');
        } catch (error) {
            setError(error.toString());
            console.error('Error storing generated texts:', error);
        }
    };

    return (
        <div>
            <button 
                className="p-2 bg-gray-800 text-white rounded shadow-md mr-2 hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                onClick={handleButtonClick}
            >
                <MdOutlineDocumentScanner className="mr-2" />
                <span>IA Classifications</span>
            </button>

            {error && <div>Error: {error}</div>}
            {result && (
                <div>
                    <h3>Generated Texts:</h3>
                    {result.map((item, index) => (
                        <div key={index}>
                            <h4>PDF Path: {item.pdf_path}</h4>
                            <ul>
                                {item.generated_texts.map((text, textIndex) => (
                                    <li key={textIndex}>{text}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IAClassificationsButton;

