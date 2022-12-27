import { Button, Typography } from "antd";
import React from "react";
import "./TodoItemsUpdate.scss";

export const TodoItemsUpdate = ({
  AllItems,
  activeItems,
  completedItems,
  clearCompletedItems,
  activeCount,
  todoData
}) => {

  const { Text } = Typography;

  let count = 0

  let setCount = 0

  todoData.filter (each => {
    if (each.isChecked === true) {
      count ++
    }
    else {
      setCount ++
    }
  })


  return (
    <div className="items-update-container">
      <Text level={4} className='items-count'> {setCount} items left</Text>
      <div>
        <Button className="todo-items-update-buttons" onClick={AllItems}>
          All
        </Button>
        <Button className="todo-items-update-buttons" onClick={activeItems}>
          Active
        </Button>
        <Button className="todo-items-update-buttons" onClick={completedItems}>
          Completed
        </Button>
      </div>
        <Button
          className={count>0?"todo-items-clear-buttons":'todo-items-no-clear-buttons'}
          onClick={clearCompletedItems}
        >
          Clear completed
        </Button>
    </div>
  );
};
