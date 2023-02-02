import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import NewQuestion from "./components/NewQuestion.jsx";
import QuestionPage from "./components/QuestionPage.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/new-question" element={<NewQuestion />} />
        <Route path="/question/:id" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
