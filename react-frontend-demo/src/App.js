import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import FormReusable from './components/FormReusable';
import FileUpload from './components/FileUpload'
import 'bootstrap/dist/css/bootstrap.min.css';
import StyleDemo from './components/StyleDemo';
import ImagePreview from './components/ImagePreview';
import NavBar from './components/Nav'

function App() {
  return (
    <Router>
        <NavBar />
        <Route path='/upload' component={FileUpload} />
        <Route path='/demo' component={StyleDemo} />
        <Route path='/preview' component={ImagePreview} />
        <Route path='/form' component={FormReusable} />
    </Router>
  );
}

export default App;
