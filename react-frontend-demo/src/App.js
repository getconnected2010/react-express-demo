import React from 'react'
import FormReusable from './components/FormReusable';
import FileUpload from './components/FileUpload'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="App bg-secondary p-5">
      <FileUpload />
    </div>
  );
}

export default App;
