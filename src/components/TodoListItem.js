import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <div className={style.ItemsList}>
      <li className={style.ListItem}>
        <span>
          <a className={style.link}>
            <span className={style.checkboxLabel}>
              <input
                className={style.checkboxItem}
                type="checkbox"
                title="checkboxItem"
              ></input>
              <label htmlFor="checkboxItem">{todo.fields.Title}</label>
            </span>
          </a>
        </span>
        <span></span>
        <span>{todo.fields.Priority}</span>
        <span>
          <button
            className={style.removeButton}
            type="button"
            onClick={() => {
              onRemoveTodo(todo.id);
            }}
          >
            <span className={style.btn_part}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </span>
            <span className={style.btn_part}>Remove</span>
          </button>
        </span>
      </li>
    </div>
  );
};
TodoListItem.propTypes = {
  onAddTodo: PropTypes.func,
};
export default TodoListItem;
