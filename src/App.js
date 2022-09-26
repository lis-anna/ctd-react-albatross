import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";
import { useEffect } from "react";

const API_ENDPOINT = 0;
const App = () => {
  // const savedList = JSON.parse(localStorage.getItem("savedTodoList"));
  // const [todoList, setTodoList] = useSemiPersistentState();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      });
  });

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    // console.log(id);
    const updatedList = todoList.filter((e) => e.id !== id);

    //   deletLi.parentNode.removeChild(deletLi);
    setTodoList(updatedList);
    // console.log(updatedList);
  }

  //console.log(savedList);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              <p>{isLoading ? "Loading..." : ""} </p>
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            </>
          }
        ></Route>
        <Route exact path="/new" element={<h1> New Todo List</h1>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
