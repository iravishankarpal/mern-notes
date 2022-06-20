import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Pages/Login";
import Regester from "./component/Pages/Regester";
import MyNotes from "./component/Pages/MyNotes";
import CreateNote from "./component/Pages/CreateNote";
import ProfileUpdate from "./component/Pages/ProfileUpdate";
import UpdateNote from "./component/Pages/UpdateNote";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Regester />}></Route>
          <Route path="/MyNotes" element={<MyNotes />}></Route>
          <Route path="/CreateNote" element={<CreateNote />}></Route>
          <Route path="/ProfileUpdate" element={<ProfileUpdate />}></Route>
          <Route path="/UpdateNote/:id" element={<UpdateNote />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
