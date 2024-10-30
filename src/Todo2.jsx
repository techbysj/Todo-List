import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todo.css";

export function Todo2() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    axios.get("http://localhost:8000/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => console.log(error.message));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.length <= 0) {
      return;
    }
    axios.post("http://localhost:8000/todo/", { title: todoInput })
      .then((res) => {
        setTodos((prevTodos) => [...prevTodos, res.data]);
        setTodoInput("");
        alert("Todo added successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error adding todo");
      });
  };

  const completeTodo = (e, todo) => {
    const id = todo._id;
    axios.put(`http://localhost:8000/todo/${id}`, { completed: e.target.checked })
      .then((res) => {
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t._id === id ? { ...t, completed: res.data.completed } : t
          )
        );
        
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error updating todo");
      });
  };

  const deleteTodo = (todo) => {
    axios.delete(`http://localhost:8000/todo/${todo._id}`)
      .then((res) => {
        setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
        alert("Todo deleted");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error deleting todo");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Enter your Todo</label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "strike-through" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => completeTodo(e, todo)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

