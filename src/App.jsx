import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
