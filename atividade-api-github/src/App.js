import './App.css';
import { useEffect } from 'react'
import Form from './components/Form';
function App() {
  useEffect(()=>{
    fetch("")
  },[])
  return (
    <div className="App">
      <header className="App-header">
          <Form></Form>
      </header>
    </div>
  );
}

export default App;
