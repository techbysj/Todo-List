import React from "react";
import { useState } from "react";
import './todo.css';

function Todo(){
  /**
   * Track a list of users Todo
   * Allow users to create new Todo's
   * 
   * {
   *    "title": "Complete our TODO app",
   *    "complete": true,
   *    "id": 1 
   * }
   */
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the user inputed anything on the form
        if(todoInput.length<=0){
            //nothing to see
            return
        }
        let todoID = todos.length + 1;
        //ADDING VALUE INPUT element to our list of Todos
        setTodos([...todos,
            {       
              "title": todoInput,
              "complete": false,
              "id": todoID
            }
        ]);

        //We want to clear the form for resuse
        setTodoInput('');

    }

    const getIndexOfTodo = (todo) => {
        let checkedIndex = -1;
        todos.forEach((element, i) => {
            if(todo.id === element.id) {
                checkedIndex = i;
            }
        });
        return checkedIndex;
    } 

    const completeTodo = (e, todo) => {
        let checkedIndex = getIndexOfTodo(todo);
        let newTodoList = todos;
        if(e.target.checked) {
            newTodoList[checkedIndex].complete = true;
        } else {
            newTodoList[checkedIndex].complete = false;
        }
        setTodos([...newTodoList]);
    }

    const deleteTodo = (todo) => {
        let checkedIndex = getIndexOfTodo(todo);
        let newTodoList = todos;
        newTodoList.splice(checkedIndex, 1);
        setTodos([...newTodoList]);
    }

    return(
    <>
     <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Enter your Todo</label>
        <input type="text" name="todo" id="todo" 
        value={todoInput}onChange={(e) => {setTodoInput(e.target.value)}} 
        />
        <button type='submit'>Add Todo</button>
     </form>
     <ul>
        {todos.map((todo) =>
          (<li key={todo.id} className={todo.complete ? 'strike-through' : ""}>
            <input type="checkbox" checked={todo.complete} 
            onChange={(e) => completeTodo(e, todo)}/>
            {todo.title}
            <button onClick={() => deleteTodo(todo)}>Delete</button>    
        </li>)
        )
        }
     </ul>
    </>
  );  
}

export default Todo;