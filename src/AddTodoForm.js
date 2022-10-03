import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoForm.module.css";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    //save an item without ID, because ID will be assigned by airtable when writing to table
    onAddTodo({ fields: { Title: todoTitle } });
    setTodoTitle("");
  }

  return (
    <div>
      <form class={style.ToDoFormContainer} onSubmit={handleAddTodo}>
        <InputWithLabel
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
        >
          Title
        </InputWithLabel>
        <button className={style.submitButton} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
export default AddTodoForm;
