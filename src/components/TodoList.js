import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo }) => {
  // console.log(Object.entries(todoList));

  return (
    <ul>
      {todoList.map(function (item) {
        return (
          <TodoListItem todo={item} key={item.id} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
};
TodoList.propTypes = {
  onAddTodo: PropTypes.func,
};
export default TodoList;
