"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_1 = require("../models/task");
const taskValidation_1 = require("../utils/taskValidation");
exports.taskRouter = (0, express_1.Router)();
// Obtener todas las tareas
exports.taskRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
}));
// Crear nueva tarea
exports.taskRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const validation = (0, taskValidation_1.validateAndTransformTaskData)(req.body);
        if (!validation.isValid || !validation.data) {
            return res.status(400).json({
                error: (_a = validation.error) === null || _a === void 0 ? void 0 : _a.message,
                details: (_b = validation.error) === null || _b === void 0 ? void 0 : _b.details
            });
        }
        const task = new task_1.Task(validation.data);
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({
            error: 'Error al crear la tarea',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}));
// Actualizar tarea
exports.taskRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const validation = (0, taskValidation_1.validateAndTransformTaskData)(req.body);
        if (!validation.isValid || !validation.data) {
            return res.status(400).json({
                error: (_a = validation.error) === null || _a === void 0 ? void 0 : _a.message,
                details: (_b = validation.error) === null || _b === void 0 ? void 0 : _b.details
            });
        }
        const task = yield task_1.Task.findByIdAndUpdate(req.params.id, validation.data, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea', details: error.message });
    }
}));
// Eliminar tarea
exports.taskRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
}));
