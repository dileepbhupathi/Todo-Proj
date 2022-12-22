import { List } from "antd";
import React from "react";
import "./TodoList.scss";
import { TodoListItem } from "../TodoListItem/TodoListItem";

export const TodoList = ({ todoData, setTodoData, isChecked, setIsChecked}) => {

  return (
    <>
      <List
        className="todo-list-container"
        dataSource={todoData}
        renderItem={(item,i) => (
          <TodoListItem item = {item} i = {i} setTodoData = {setTodoData} isChecked = {isChecked} setIsChecked = {setIsChecked}/>
        )}
      />
    </>
  );
};
