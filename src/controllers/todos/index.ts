// needed to define types of req & res of express
import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import ToDo from "../../models/todo";
import { DESTRUCTION } from "dns";
import { ifError } from "assert";

// need to define again what the function returns: Promise with type void as it doesn't return a value
const getToDos = async (req: Request, res: Response): Promise<void> => {
    try{
        // without TS: const todos = await ToDo.find()
        const todos: ITodo[] = await ToDo.find();
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
}

const addToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        // ???
        const body = req.body as Pick<ITodo, "name" | "description" | "status">

        const toDo: ITodo = new ToDo({
            name: body.name,
            description: body.description,
            status: body.status
        });

        const newToDo: ITodo = await ToDo.save();
        const allToDos: ITodo[] = await ToDo.find();

        res.status(201).json({message: "ToDo added", todo:})
    } catch (error) {
        throw error
    }
}