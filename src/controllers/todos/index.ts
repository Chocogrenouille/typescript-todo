// needed to define types of req & res of express
import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import ToDo from "../../models/todo";

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
        // asigns req.body to constant and uses typecasting to match ITodo
        // check out Pick
        const body = req.body as Pick<ITodo, "name" | "description" | "status">

        const toDo: ITodo = new ToDo({
            name: body.name,
            description: body.description,
            status: body.status
        });

        // save() - 
        // waits for toDo to be created first before it asigns it to newToDo, typescript saves it as an IToDo instance
        const newToDo: ITodo = await toDo.save();
        // waits to find all toDos before asigning it to allToDos, typscript saves it as an array of IToDo instances
        const allToDos: ITodo[] = await ToDo.find();

        res.status(201).json({
            message: "ToDo added", 
            todo: newToDo, 
            todos: allToDos
        });

    } catch (error) {
        throw error
    }
}

const updateToDo = async (req: Request, res: Response): Promise<void> => {
    try{
        const {params: {id}, body} = req;

        const updateToDo: ITodo | null = await ToDo.findByIdAndUpdate(
            {_id: id}, body
        )

        const allToDos: ITodo[] = await ToDo.find();

        res.status(200).json({
            message: "ToDo updated",
            todo: updateToDo,
            todos: allToDos
        })
    }
    catch (error) {
        throw error
    }
}

const deleteToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedToDo: ITodo | null = await ToDo.findByIdAndRemove(
            req.params.id
        );

        const allToDos: ITodo[] = await ToDo.find();

        res.status(200).json({
            message: "Todo deleted",
            todo: deletedToDo,
            todos: allToDos
        })
    } catch (error) {
        throw error
    }
}