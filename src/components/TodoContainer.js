import PropTypes from "prop-types";
import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";
import { useEffect } from "react";
import style from "./TodoForm.module.css";

const TodoContainer = ({ tableName }) => {
  // const savedList = JSON.parse(localStorage.getItem("savedTodoList"));
  // const [todoList, setTodoList] = useSemiPersistentState();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        result.records.sort(sortRecords);
        //  console.log(result.records);
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => console.log("Whoops, something went wrong!", error));
  }, [tableName]);

  useEffect(() => {
    // if todo list is already loaded
    if (!isLoading) {
      //check every item of the list whether it has an ID. If it doesn't - than it's new and should be added to the table
      for (let i = 0; i < todoList.length; i++) {
        let todo_el = todoList[i];
        if (!todo_el.id) {
          //call API with method POST
          fetch(
            `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`,
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
  function sortRecords(objectA, objectB) {
    let sorted;
    if (objectA.fields.Title < objectB.fields) sorted = 1;
    if (objectA.fields === objectB.fields) sorted = 0;
    if (objectA.fields > objectB.fields) sorted = -1;

    return sorted;
  }

  function removeTodo(id) {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(id);
        const updatedList = todoList.filter((e) => e.id !== id);
        setTodoList(updatedList);
        //     console.log(updatedList);
        //result.records.sort(sortRecords());
        setIsLoading(false);
      });
  }

  return (
    <>
      <h1 className={style.title}>Keep your {tableName} todos here!</h1>
      <AddTodoForm className={style.submitForm} onAddTodo={addTodo} />
      <p>{isLoading ? "Loading..." : ""} </p>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
};

TodoContainer.propTypes = {
  onAddTodo: PropTypes.func,
};

export default TodoContainer;
