import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";
import { useEffect } from "react";
import style from "./TodoForm.module.css";

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
  }, []);

  useEffect(() => {
    // if todo list is already loaded
    if (!isLoading) {
      //check every item of the list whether it has an ID. If it doesn't - than it's new and should be added to the table
      for (let i = 0; i < todoList.length; i++) {
        let todo_el = todoList[i];
        if (!todo_el.id) {
          //call API with method POST
          fetch(
            `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                "Content-Type": "application/json",
              },
              // put new element to body of the request. docompose JSON to get the value
              body: JSON.stringify({
                records: [todo_el],
              }),
            }
          )
            //get the response and transform it to JSON object
            .then((response) => response.json())
            //process the object
            .then((result) => {
              //put the added value to the beginning of Todo list
              todoList[i] = result.records[0];
              //save updated todo list to local storage
              localStorage.setItem("savedTodoList", JSON.stringify(todoList));
              setIsLoading(false);
            });
        }
      }
      //if nothing new was added, just save todo list to local storage
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
    <div className={style.TodoContainer}>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <h1 className={style.title}>Keep your todos here!</h1>
                <AddTodoForm className={style.submitForm} onAddTodo={addTodo} />
                <p>{isLoading ? "Loading..." : ""} </p>
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </>
            }
          ></Route>
          <Route exact path="/new" element={<h1> New Todo List</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
