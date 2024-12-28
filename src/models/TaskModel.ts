import mongoose, { Document, Schema } from 'mongoose';


export interface Task extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
    createAt: Date;
    user: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<Task>({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const TaskModel = mongoose.model<Task>('Tasks', TaskSchema);