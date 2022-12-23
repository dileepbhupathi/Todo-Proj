import { List } from "antd";
import React from "react";
import "./TodoList.scss";
import { TodoListItem } from "../TodoListItem/TodoListItem";

export const TodoList = ({
  todoData,
  setTodoData,
}) => {
  return (
    <>
      <List
        className="todo-list-container"
        dataSource={todoData}
        renderItem={(item, i) => (
          <TodoListItem
            item={item}
            i={i}
            setTodoData={setTodoData}
          />
        )}
      />
    </>
  );
};
