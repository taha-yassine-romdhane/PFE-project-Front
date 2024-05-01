import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';

const WelcomePage = () => {
  return (
    <div className="p-8   flex items-center justify-center">
      <div className="text-white text-center max-w-lg px-8 py-12 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to File-Extractor</h1>
        <p className="text-lg text-gray-800 mb-8">
           Notre projet Fin d'étude , c'est un système de gestion de documents utilisant l'IA. 
L'objectif est de simplifier la gestion des documents en automatisant la classification, l'extraction d'informations et la recherche avancée.
        </p>
        <div className="mb-8">
          <Link
            to="/signup"
            className="inline-block bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-800"
          >
            Get Started <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/Client/login" className="text-black hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;

