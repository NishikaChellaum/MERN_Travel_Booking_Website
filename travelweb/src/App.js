import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./router/AllRoutes";
import Footer from "./components/Footer"; 
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer /> 
    </div>
  );
}

export default App;
