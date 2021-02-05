import React from 'react'
import FormReusable from './components/FormReusable';
import FileUpload from './components/FileUpload'
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/App.scss'
import StyleDemo from './components/StyleDemo';
import ImagePreview from './components/ImagePreview';

function App() {
  return (
    <div className="App ">
      {/* <FileUpload />
      <ImagePreview /> */}
      <StyleDemo />
    </div>
  );
}

export default App;
