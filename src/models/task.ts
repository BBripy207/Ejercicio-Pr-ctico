import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    description: {
        type: String,
        default: ''
    },
    startTime: {
        type: Date,
        required: [true, 'La hora de inicio es obligatoria']
    },
    endTime: {
        type: Date,
        required: [true, 'La hora de finalización es obligatoria']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const Task = model<ITask>('Task', taskSchema);
