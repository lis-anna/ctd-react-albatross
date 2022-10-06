import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import TodoContainer from "./components/TodoContainer";
import style from "./components/PageStyles.module.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <hr className={style.navLine} />
      </div>

      <Routes>
        <Route
          path="/"
          exact
          element={<TodoContainer tableName={"Default"} />}
        ></Route>
        <Route
          exact
          path="/work"
          element={<TodoContainer tableName={"Work"} />}
        ></Route>
        <Route
          exact
          path="/travel"
          element={<TodoContainer tableName={"Travel"} />}
        ></Route>
      </Routes>
      <div>
        <hr className={style.btmLine} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
