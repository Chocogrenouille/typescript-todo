import { Document } from "mongoose";

// Document is my class
// an interface decides on the structure of types of different instances of a class/object
export interface ITodo extends Document {
    name: string,
    description: string,
    status: boolean
}