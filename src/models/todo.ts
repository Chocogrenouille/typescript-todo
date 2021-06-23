import {ITodo} from './../types/todo';
import { model, Schema } from 'mongoose';

// need to define type of const toDoSchema
const toDoSchema: Schema = new Schema(
    {
        name : {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status : {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true}
)

// need to define type of model 
export default model<ITodo>("ToDo", toDoSchema);