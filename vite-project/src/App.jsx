import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LinearChart from "./components/LineChart"
import ItemList from './components/itemlist'

function App() {

  return (
    <>
     <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/:id" element={<LinearChart />} />
        </Routes>
      </div>
     </Router> 
    </>
  )
}

export default App
