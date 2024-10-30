import React, { useEffect, useState } from "react";
import "./todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    fetch("http://localhost:8000/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error.message));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.length <= 0) {
      return;
    }
    fetch("http://localhost:8000/todo/", {
      method: "POST",
      body: JSON.stringify({
        title: todoInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
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
    fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: e.target.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t._id === id ? { ...t, completed: updatedTodo.completed } : t
          )
        );
        // alert("Todo updated successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error updating todo");
      });
  };

  const deleteTodo = (todo) => {
    fetch(`http://localhost:8000/todo/${todo._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
          alert("Todo deleted");
        } else {
          alert("Error deleting todo");
        }
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

export default Todo;
