import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Navbar';
import Hero from './components/Hero';
import MethodsSection from './components/MethodsSection';
import IntroductionSection from './components/Introduction';
import MethodsButton from './components/MethodsButton';
import VizualizationButton from './components/VizualizationButton';
import Footer from './components/Footer';
import VisualizationPage from './components/VisualizationPage';
import MethodsPage from './components/MethodsPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/methods" element={<MethodsPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <IntroductionSection />
    <MethodsButton />
    <VizualizationButton />
    {/* <MethodsSection /> */}
  </>
);

export default App;
