import React, { useState } from "react";
import "./TodoInput.scss";
import { v4 as uuid } from "uuid";
import { Typography, Input, Form } from "antd";
import { TodoList } from "../../components/TodoList/TodoList";
import { TfiAngleDown } from "react-icons/tfi";
import { TodoItemsUpdate } from "../../components/TodoItemsUpdate/TodoItemsUpdate";

export const TodoInput = ({ todoData, setTodoData , isData,setIsData }) => {
  const { Text } = Typography;

  const [todoform] = Form.useForm();

const [isChecked, setIsChecked] = useState(false);



  // const [allChecked, setAllChecked] = useState(false);



  const content = <pre className="input-prefix">{"    "}</pre>;

  const TodoSubmit = (value) => {
    todoform.resetFields();

    const request = indexedDB.open("TodoProj", 2);

    //  create the Contacts object store and indexes

    function insertBoard(db, todoListData) {
      // create a new transaction
      const txn = db.transaction(["todoListData"], "readwrite"); // get the Contacts object store
      const store = txn.objectStore("todoListData");
      let query = store.add(todoListData);

      query.onsuccess = function (event) {
        console.log(event);
      };
      // handle the error case

      txn.oncomplete = function () {
        db.close();
      };
    }
    request.onupgradeneeded = () => {
      let db = request.result;

      console.log("db", db); // create the Contacts object store // with auto-increment id

      let store = db.createObjectStore("todoListData", {
        keyPath: "index",
        autoIncrement: true,
      }); // create an index on the email property

      let index = store.createIndex("Name", "Name", {
        keyPath: "name",
        unique: true,
      });
      console.log("index", index);
    };

    request.onsuccess = () => {
      const db = request.result;

      insertBoard(db, {
        id: uuid().slice(0, 3),
        Name: value.listitem,
        isChecked: false,
      });

      let gettingTodoData = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();

      gettingTodoData.onsuccess = function (event) {
        const todoDataFromIDB = event.target.result;
        setTodoData(todoDataFromIDB);
        if (todoDataFromIDB.length < 1) {
          setIsData(false);
        } else {
          setIsData(true);
        }
      };
    };
  };

  const AllItems = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const getAllIDB = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      getAllIDB.onsuccess = (event) => {
        let getAllIDBData = event.target.result;
        setIsData(true);
        setTodoData(getAllIDBData);
      };
    };
  };

  const activeItems = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const getActiveDB = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      getActiveDB.onsuccess = (event) => {
        let getActiveDBData = event.target.result;
        let activeData = [];
        getActiveDBData.forEach((element) => {
          if (element.isChecked === false) {
            activeData.push(element);
          }
        });
        console.log(activeData);
        setTodoData(activeData);
        if (getActiveDBData.length === 0) {
          setIsData(false);
        } else {
          setIsData(true);
        }
      };
    };
  };

  const completedItems = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const getCompleteDB = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      getCompleteDB.onsuccess = (event) => {
        let getCompleteDBData = event.target.result;
        let completedData = [];
        getCompleteDBData.forEach((element) => {
          if (element.isChecked === true) {
            completedData.push(element);
          }
        });
        console.log(completedData);
        setTodoData(completedData);
        if (completedData.length < 1) {
          setIsData(false);
        } else {
          setIsData(true);
        }
      };
    };
  };

  const clearCompletedItems = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const getClearCompleted = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      getClearCompleted.onsuccess = (event) => {
        let getClearCompletedData = event.target.result;
        getClearCompletedData.forEach((element) => {
          if (element.isChecked === true) {
            db.transaction(["todoListData"], "readwrite")
              .objectStore("todoListData")
              .delete(element.index);
          }
        });
        let finallIDB = db
          .transaction(["todoListData"], "readwrite")
          .objectStore("todoListData")
          .getAll();
        finallIDB.onsuccess = (e) => {
          let finallIDBData = e.target.result;
          setTodoData(finallIDBData);
          if (finallIDBData.length < 1) {
            setIsData(false);
          } else {
            setIsData(true);
          }
        };
        // console.log(completedData)
      };
    };
  };

  const allTodoItemsChecked = () => {
    const request = indexedDB.open("TodoProj", 2);

    request.onsuccess = () => {
      const db = request.result;

      const todoAllCheckedIDB = db
        .transaction(["todoListData"], "readwrite")
        .objectStore("todoListData")
        .getAll();
      
        todoAllCheckedIDB.onsuccess = (e) => {
          let todoAllCheckedIDBData = e.target.result
          let allCheckedData = []
          todoAllCheckedIDBData.forEach(each => {
            each.isChecked = !isChecked
            console.log('.....',each)
            
            allCheckedData.push(each)
            setTodoData(allCheckedData)
            db.transaction(["todoListData"], "readwrite")
            .objectStore("todoListData")
            .put(each);
            setIsChecked(!isChecked)
          })
          // const todocheckedIDB = db
          // .transaction(["todoListData"], "readwrite")
          // .objectStore("todoListData")
          // .getAll();
        //   todocheckedIDB.onsuccess = (e) => {
        //     let todocheckedIDBData = e.target.result 
        //     
        //   }
        }

    };
  };

  console.log('/////',todoData)

  return (
    <div className="todo-input-container">
      <Text className="todo-title">todos</Text>
      <div className="todo-input-bar-container">
        <Form
          onFinish={(values) => TodoSubmit(values)}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          form={todoform}
        >
          <Form.Item name="listitem">
            <Input
              className="todo-search"
              placeholder="What needs to be done?"
              prefix={
                isData ? (
                  <TfiAngleDown
                    className="down-angle"
                    onClick={allTodoItemsChecked}
                  />
                ) : (
                  content
                )
              }
            />
          </Form.Item>
        </Form>
        {isData ? (
          <TodoList todoData={todoData} setTodoData={setTodoData} isChecked = {isChecked} setIsChecked = {setIsChecked}/>
        ) : null}

        <TodoItemsUpdate
          AllItems={AllItems}
          activeItems={activeItems}
          completedItems={completedItems}
          clearCompletedItems={clearCompletedItems}
        />
      </div>
    </div>
  );
};
