import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = ({ filteredTodos, todos, setTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            todos={todos}
            todo={todo}
            setTodos={setTodos}
            key={todo.id}
            value={todo.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
