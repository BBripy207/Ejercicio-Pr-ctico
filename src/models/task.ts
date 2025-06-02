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
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres']
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    startTime: {
        type: Date,
        required: [true, 'La hora de inicio es obligatoria'],
        validate: {
            validator: function(value: Date) {
                return value >= new Date();
            },
            message: 'La fecha de inicio debe ser igual o posterior a la fecha actual'
        }
    },
    endTime: {
        type: Date,
        required: [true, 'La hora de finalización es obligatoria'],
        validate: {
            validator: function(this: ITask, value: Date) {
                return value > this.startTime;
            },
            message: 'La hora de finalización debe ser posterior a la hora de inicio'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Task = model<ITask>('Task', taskSchema);
