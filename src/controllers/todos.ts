import { Request, Response, NextFunction, RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

// export const createTodo = (req : Request, res : Response, next: NextFunction) => {}; // same like next lane
export const createTodo: RequestHandler = (req, res, next) => {
  const text = req.body.text as string;

  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  console.log(TODOS);
  res.status(201).json({ message: "Create the todo. ", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Todo not found!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({ message: "Updated!", updateTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Todo not found!");
  }

  TODOS.slice(todoIndex, 1);
  res.json({ message: "Todo was deleted!", todoId: todoId });
};
