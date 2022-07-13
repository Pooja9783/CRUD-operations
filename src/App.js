import './App.css';
import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import Home from "./components/pages/Home"
import View from './components/View';
import Edit from './components/Edit';
function App() {
  return (
    <div className="App">
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path={`/view/:id`} element={<View />}/>
        <Route path={`/edit/:id`} element={<Edit />}/>
     </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
