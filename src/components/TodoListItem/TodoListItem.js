import { Checkbox, List } from "antd";
import { RxCross2 } from "react-icons/rx";
import "./TodoListItem.scss";

import React, { useState } from "react";

export const TodoListItem = ({
  item,
  i,
  setTodoData,
  isChecked,
  setIsChecked,
}) => {
  const [isDone, setIsDone] = useState(item.isChecked);

  const todoItemRemove = (i) => {
    console.log(item);
    // let iDBData = todoData
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;
      db.transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .delete(item.index);

      let updatedIDBTodo = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();

      updatedIDBTodo.onsuccess = (e) => {
        const updatedIDBTodoData = e.target.result;
        setTodoData(updatedIDBTodoData);
      };
    };
    if (isChecked) {
      setIsChecked(!isChecked);
    }
  };

  const checkedItem = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;
      let iDBItem = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .get(item.index);

      iDBItem.onsuccess = (e) => {
        let iDBItemData = e.target.result;
        iDBItemData.isChecked = !isChecked;
        db.transaction(["todoListData"], "readwrite")
          .objectStore("todoListData")
          .put(iDBItemData);
        if (iDBItemData.isChecked === true) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
        setIsDone(!isDone);
        let todoUpdatedIDB = db
          .transaction(["todoListData"], "readwrite")
          .objectStore("todoListData")
          .getAll();
          todoUpdatedIDB.onsuccess = (e) => {
            let todoUpdatedIDBData = e.target.result
            setTodoData(todoUpdatedIDBData)
          }
      };
    };
  };

  return (
    <List.Item key={item.id}>
      <Checkbox
        checked={item.isChecked}
        // indeterminate = {isChecked}
        onClick={() => {
          checkedItem();
        }}
      ></Checkbox>
      <span
        className={
          item.isChecked ? "list-item-text" : "list-item-text-unchecheked"
        }
      >
        {item.Name}
      </span>
      <RxCross2
        onClick={(i) => {
          todoItemRemove(i);
        }}
      />
    </List.Item>
  );
};
