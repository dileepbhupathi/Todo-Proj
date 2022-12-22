import { Button, Typography } from 'antd'
import React from 'react'
import './TodoItemsUpdate.scss'

export const TodoItemsUpdate = ({AllItems,activeItems,completedItems,clearCompletedItems,activeCount}) => {

    const {Text} = Typography

  return (
    <div className='items-update-container'>
        <Text level = {4}> {activeCount}items left</Text>
        <div>
            <Button className='todo-items-update-buttons' onClick={AllItems}>All</Button>
            <Button className='todo-items-update-buttons' onClick={activeItems}>Active</Button>
            <Button className='todo-items-update-buttons' onClick={completedItems}>Completed</Button>
        </div>
        <Button className='todo-items-clear-buttons' onClick={clearCompletedItems}>
            Clear completed
        </Button>
    </div>
  )
}
