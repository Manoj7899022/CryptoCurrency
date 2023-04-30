import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import 'react-alice-carousel/lib/alice-carousel.css';


function App() {

  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/coins/:id" Component={CoinPage} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

