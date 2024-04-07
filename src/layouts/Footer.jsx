import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 Vaerdia Solution</p>
          <nav>
            <ul className="flex">
              <li className="ml-4"><a href="#">Home</a></li>
              <li className="ml-4"><a href="#">About</a></li>
              <li className="ml-4"><a href="#">Services</a></li>
              <li className="ml-4"><a href="/Home">Contact</a></li>
            
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
