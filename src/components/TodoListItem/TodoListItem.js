import { Checkbox, List } from "antd";
import { RxCross2 } from "react-icons/rx";
import "./TodoListItem.scss";

import React, {  useState } from "react";

export const TodoListItem = ({
  item,
  i,
  setTodoData,
}) => {

  const [isChecked, setIsChecked] = useState(false);

  const [isDone, setIsDone] = useState(false);

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
          setIsChecked(!isChecked);
          setIsDone(!isDone);
        };
      };

  };


  return (
    <List.Item key={item.id}>
      <Checkbox
        checked={isChecked}
        onChange={() => {
          checkedItem();
        }}
      ></Checkbox>
      <span
        className={isDone ? "list-item-text" : "list-item-text-unchecheked"}
      >
        {item.Name}
      </span>
      <RxCross2
        onClick={(i) => {
          todoItemRemove(i);
          // console.log('icon', e.currentTarget.attributes.data)
        }}
      />
    </List.Item>
  );
};
