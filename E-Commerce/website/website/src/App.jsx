import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Cart from "./Components/Cart";
import Product from "./Components/Product";
import About from "./Components/About";
import Contact from "./Components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>

      </Routes>
    </Router>
  )
};
export default App;