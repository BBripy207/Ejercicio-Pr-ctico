import { Router, Request, Response } from 'express';
import { Task } from '../models/task';
import { validateAndTransformTaskData } from '../utils/taskValidation';

export const taskRouter = Router();

// Obtener todas las tareas
taskRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// Crear nueva tarea
taskRouter.post('/', async (req: Request, res: Response) => {
    try {
        const validation = validateAndTransformTaskData(req.body);
        
        if (!validation.isValid || !validation.data) {
            return res.status(400).json({
                error: validation.error?.message,
                details: validation.error?.details
            });
        }

        const task = new Task(validation.data);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ 
            error: 'Error al crear la tarea', 
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

// Actualizar tarea
taskRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const validation = validateAndTransformTaskData(req.body);
        
        if (!validation.isValid || !validation.data) {
            return res.status(400).json({
                error: validation.error?.message,
                details: validation.error?.details
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            validation.data,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea', details: error.message });
    }
});

// Eliminar tarea
taskRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});
