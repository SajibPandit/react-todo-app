import React from 'react'
import {CustomInput, Button,Table} from 'reactstrap'
import PropTypes from 'prop-types'

const RowItem = ({todo,toggleSelect,toggleComplete}) =>{
    return(
        <tr>
            <th scope='row'>
                <CustomInput
                    type='checkbox'
                    id={todo.id}
                    checked={todo.isSelect}
                    onChange={()=>toggleSelect(todo.id)}
                />
            </th>
            <th>
                {todo.time.toDateString()}
            </th>
            <th>{todo.text}</th>
            <th>
                <Button color={todo.isComplete ? 'danger':'success'} onClick={()=>toggleComplete(todo.id)}>
                    {todo.isComplete ? 'Completed':'Running'}
                </Button>
            </th>
        </tr>
    )
}

RowItem.propTypes = {
    todo : PropTypes.object.isRequired,
    toggleSelect : PropTypes.func.isRequired,
    toggleComplete : PropTypes.func.isRequired
}

const TableView = ({todos,toggleSelect,toggleComplete})=>{
    return (
        <Table className='table-striped'>
        <thead>
            <tr>
                <th>#</th>
                <th>Time</th>
                <th>Todo</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo=>(
                <RowItem 
                    key={todo.id}
                    todo={todo}
                    toggleSelect={toggleSelect}
                    toggleComplete = {toggleComplete}
                />
            ))}
        </tbody>
    </Table>
    )
}

TableView.propTypes = {
    todos : PropTypes.object.isRequired,
    toggleSelect : PropTypes.func.isRequired,
    toggleComplete : PropTypes.func.isRequired
}

export default TableView