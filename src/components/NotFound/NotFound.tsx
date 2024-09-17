import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <Link to="/catalog">Return to Catalog</Link>
    </div>
  );
};

export default NotFound;
