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
const API_URL = 'http://localhost:3000/tasks';
// Función para cargar todas las tareas
function loadTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const tasks = yield response.json();
            displayTasks(tasks);
        }
        catch (error) {
            console.error('Error al cargar las tareas:', error);
            alert('Error al cargar las tareas');
        }
    });
}
// Función para mostrar las tareas en el DOM
function displayTasks(tasks) {
    const tasksListElement = document.getElementById('tasksList');
    if (!tasksListElement)
        return;
    tasksListElement.innerHTML = tasks.map(task => `
        <div class="col-md-6 col-lg-4">
            <div class="card task-card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text">
                        <small class="text-muted">
                            Inicio: ${new Date(task.startTime).toLocaleString()}<br>
                            Fin: ${new Date(task.endTime).toLocaleString()}
                        </small>
                    </p>
                    <div class="d-flex justify-content-between">
                        <button onclick="editTask('${task._id}')" class="btn btn-sm btn-primary">Editar</button>
                        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
// Función para manejar el envío del formulario
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const taskId = document.getElementById('taskId').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const taskData = {
            title,
            description,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString()
        };
        try {
            const url = taskId ? `${API_URL}/${taskId}` : API_URL;
            const method = taskId ? 'PUT' : 'POST';
            const response = yield fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) {
                const error = yield response.json();
                throw new Error(error.details || 'Error al guardar la tarea');
            }
            resetForm();
            loadTasks();
        }
        catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Error al guardar la tarea');
        }
    });
}
// Función para editar una tarea
function editTask(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/${taskId}`);
            const task = yield response.json();
            document.getElementById('taskId').value = task._id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('startTime').value = new Date(task.startTime).toISOString().slice(0, 16);
            document.getElementById('endTime').value = new Date(task.endTime).toISOString().slice(0, 16);
        }
        catch (error) {
            console.error('Error al cargar la tarea:', error);
            alert('Error al cargar la tarea');
        }
    });
}
// Función para eliminar una tarea
function deleteTask(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            return;
        }
        try {
            const response = yield fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            loadTasks();
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la tarea');
        }
    });
}
// Función para resetear el formulario
function resetForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
}
// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    loadTasks();
});
