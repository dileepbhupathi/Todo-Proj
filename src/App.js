// import { useState } from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import { TodoInput } from "./view/TodoInputBar/TodoInput";

function App() {
  const [todoData, setTodoData] = useState([]);


  const [isData, setIsData] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
 

  useEffect(() => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const todoIDB = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      todoIDB.onsuccess = (event) => {
        let todoIDBData = event.target.result;
        setTodoData(todoIDBData);
        setIsChecked(!isChecked)
        if (todoIDBData.length < 1) {
          setIsData(false);
        } else {
          setIsData(true);
        }
      };
    };
  },[]);

  // console.log('todo :',todoData)
  return (
    <>
      <TodoInput
        todoData={todoData}
        setTodoData={setTodoData}
        isData={isData}
        setIsData={setIsData}
        isChecked = {isChecked}
        setIsChecked = {setIsChecked}
      />
    </>
  );
}

export default App;
