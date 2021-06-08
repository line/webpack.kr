// Import External Dependencies
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as AnalyticsRouter } from 'react-g-analytics';

import App from './App.jsx';

import './styles/tailwind.css';
// Import helpers
import isClient from './utilities/is-client';
import { HelmetProvider } from 'react-helmet-async';

const gaTrackingID = process.env.PHASE === 'real' ? 'UA-192982695-2' : 'UA-192982695-1';

const isProduction = process.env.NODE_ENV === 'production';

const Router = isProduction ? AnalyticsRouter : BrowserRouter;
const render = isProduction ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  render(
    <Router id={gaTrackingID}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>,
    document.getElementById('root')
  );
}
