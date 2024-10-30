import { Router } from "express";
import { TodoModel } from "../models/todo.js";

const todoRouter = Router();

// GET /todos
todoRouter.get("/", async (req, res) => {
  try {
    const fetchedTodos = await TodoModel.find();
    if (!fetchedTodos.length) {
      return res.status(404).json([]);
    }
    res.json(fetchedTodos);
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
});

// GET /todos/:id
todoRouter.get("/:id", async (req, res) => {
  try {
    const fetchedTodo = await TodoModel.findById(req.params.id);
    if (!fetchedTodo) {
      return res.status(404).json({ message: "No todo found with id " + req.params.id });
    }
    res.json(fetchedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
});

// POST /todos
todoRouter.post("/", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
});

// PUT /todos/:id
todoRouter.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: "No todo found with id " + req.params.id });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
});

// DELETE /todos/:id
todoRouter.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "No todo found with id " + req.params.id });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
});

export { todoRouter };
