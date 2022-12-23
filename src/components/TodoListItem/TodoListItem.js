import { Checkbox, List } from "antd";
import { RxCross2 } from "react-icons/rx";
import "./TodoListItem.scss";

import React from "react";

export const TodoListItem = ({
  item,
  i,
  setTodoData,
}) => {

  const todoItemRemove = (i) => {
    console.log(item);
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
        if (iDBItemData.isChecked === true) {
          iDBItemData.isChecked = false
          db.transaction(["todoListData"], "readwrite")
          .objectStore("todoListData")
          .put(iDBItemData);
        }
        else {
          iDBItemData.isChecked = true
          db.transaction(["todoListData"], "readwrite")
          .objectStore("todoListData")
          .put(iDBItemData);
        }
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
