import { Document, model, Schema } from "mongoose";



export interface Task extends Document{

        title          : string,
        description    : string,
        completed      : boolean,
        createAt       : Date,
}

const TaskShema = new Schema<Task>({
    title: {
        type: String,
        required: [true, 'Title is required'] 
    },
    description : {
        type: String,
        required : [true, 'Description is required']
    },
    completed : { 
        type : Boolean,
        default : false
    }
})


export const TaskModel = model<Task>('Tasks', TaskShema)