import MyMap from "./Map";
import Search from "./Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/map/:id" element={<MyMap />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
