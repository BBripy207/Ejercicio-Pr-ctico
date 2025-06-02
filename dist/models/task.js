"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
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
            validator: function (value) {
                return value >= new Date();
            },
            message: 'La fecha de inicio debe ser igual o posterior a la fecha actual'
        }
    },
    endTime: {
        type: Date,
        required: [true, 'La hora de finalización es obligatoria'],
        validate: {
            validator: function (value) {
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
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
