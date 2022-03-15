import { Request, Response, NextFunction, RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

// export const createTodo = (req : Request, res : Response, next: NextFunction) => {}; // same like next lane
export const createTodo: RequestHandler = (req, res, next) => {
  const text = <string>req.body.text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status (201).json( {message: "Create the todo." , createTodo : newTodo});
};
