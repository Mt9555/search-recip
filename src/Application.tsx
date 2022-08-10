import React from 'react';
import './styles/Application.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RLRecipePage from './containers/RLRecipePage/RLRecipeDisplayPage';

interface BaseComponentConfig {}

const Application: React.FC<BaseComponentConfig> = () => {
  return (
    <div className="Application">
      <Router>
        <Routes>
          <Route path="/" element={<RLRecipePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Application;
