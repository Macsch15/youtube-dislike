import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import YoutubeDislike from './components/YoutubeDislike';
import Error from './components/Error';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/error" element={<Error />} />
        <Route path="video" element={<YoutubeDislike />}>
          <Route path=":videoId" element={<YoutubeDislike />} />
        </Route>
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('app')
);
