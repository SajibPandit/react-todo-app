import React, { Component } from 'react'
import {Modal,ModalHeader,ModalBody} from 'reactstrap'
import ListView from './listview/index' 
import TableView from './tableview/index'
import CreateTodoForm from './createtodoform'
import Controller from './controllers'
import shortid from 'shortid'

export default class Todos extends Component {

    state = {
        todos : [
            {
                id:'hgregrtf',
                text:'Read Newspaper',
                description:'Read newspaper regularly',
                time:new Date(),
                isComplete:false,
                isSelect:false
            },
            {
                id:'hgreggrtffff',
                text:'Take Exercise',
                description:'Take exercise in proper time',
                time:new Date(),
                isComplete:false,
                isSelect:false
            },
            {
                id:'hgrjegrtff',
                text:'Play Games',
                description:'Play various ty[es of games',
                time:new Date(),
                isComplete:false,
                isSelect:false
            } 
        ],
        isOpenTodoForm : false,
        serachTerm:'',
        view:'list',
        filter:'all'
    }

    toggleSelect = todoId =>{
        const todos = [...this.state.todos]
        const todo = todos.find(t=>t.id === todoId)
        todo.isSelect = !todo.isSelect
        this.setState({todos})
    }

    toggleComplete = todoId =>{
        const todos = [...this.state.todos]
        const todo = todos.find(t=>t.id === todoId)
        todo.isComplete = !todo.isComplete
        this.setState({todos})
    }

    toggleForm = () =>{
        this.setState({
            isOpenTodoForm:!this.state.isOpenTodoForm
        })
    }

    handleSearch = value =>{
        this.setState({serachTerm:value})
    }

    createTodo = (todo)=>{
        todo.id = shortid.generate()
        todo.time = new Date()
        todo.isComplete = false
        todo.isSelect = false

        const todos = [todo,...this.state.todos]
        this.setState({todos})
        this.toggleForm()
    }

    handleFilter = (filter) =>{
        this.setState({filter})
    }


    changeView = event =>{
        this.setState({
            view : event.target.value
        })
    }

    clearSelected = ()=>{
        const todos = this.state.todos.filter(todo =>!todo.isSelect)
        this.setState({todos})
    }

    clearCompleted = ()=>{
        const todos = this.state.todos.filter(todo =>!todo.isComplete)
        this.setState({todos})
    }

    reset = () =>{
        
        this.setState({
            filter:'all',
            serachTerm:'',
            view:'list',
            isOpenTodoForm:false
        })
    }

    performSearch = () =>{
        return (
            this.state.todos.filter(todo=>todo.text.toLowerCase().includes(this.state.serachTerm.toLowerCase()))
        )
    }

    performFilter = todos =>{
        const {filter} = this.state
        if(filter === 'completed'){
            return todos.filter(todo =>todo.isComplete)
        }
        else if(filter === 'running'){
            return todos.filter(todo=>!todo.isComplete)
        }
        else{
            return todos
        }
    }


    getView = () =>{
        let todos = this.performSearch()
        todos = this.performFilter(todos)
        return this.state.view === 'list' ?(
            <ListView todos={todos} toggleSelect={this.toggleSelect} toggleComplete={this.toggleComplete}/>
        ) : (
            <TableView todos={todos} toggleSelect={this.toggleSelect} toggleComplete={this.toggleComplete}/>
        )
    }


    render() {
        return (
            <div>
                <h1 className='display-4 text-center mb-5'>My Todoes</h1>
                <Controller
                    term={this.state.serachTerm}
                    view={this.state.view}
                    toggleForm={this.toggleForm}
                    handleSearch={this.handleSearch}
                    handleFilter={this.handleFilter}
                    changeView={this.changeView}
                    clearSelected={this.clearSelected}
                    clearCompleted={this.clearCompleted}
                    reset={this.reset}
                />
                <div>
                    {this.getView()}
                </div>
                <Modal isOpen={this.state.isOpenTodoForm} toggle={this.toggleForm}>
                    <ModalHeader toggle={this.toggleForm}>
                        Create New Todo Item
                    </ModalHeader>
                    <ModalBody>
                        <CreateTodoForm 
                            createTodo={this.createTodo}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
