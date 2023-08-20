import React from 'react';

import Header from './components/header';
import Home from './pages/home';
import Features from './pages/features';
import CustomerEdit from './pages/customers/edit';
import About from './pages/about';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="relative min-h-screen md:flex">
          <Header />
          <main className="flex-1 p-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customers/:id" element={<CustomerEdit />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
