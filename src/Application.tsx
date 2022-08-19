import React from 'react';
import './styles/Application.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RLRecipePage from './containers/RLRecipePage/RLSearchResultsPage';

interface BComponentConfig {}

const Application: React.FC<BComponentConfig> = () => {
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
