interface Task {
    _id?: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    createdAt?: string;
    updatedAt?: string;
}

const API_URL = 'http://localhost:3000/tasks';

// Función para cargar todas las tareas
async function loadTasks(): Promise<void> {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
        alert('Error al cargar las tareas');
    }
}

// Función para mostrar las tareas en el DOM
function displayTasks(tasks: Task[]): void {
    const tasksListElement = document.getElementById('tasksList');
    if (!tasksListElement) return;

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
async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    
    const taskId = (document.getElementById('taskId') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const startTime = (document.getElementById('startTime') as HTMLInputElement).value;
    const endTime = (document.getElementById('endTime') as HTMLInputElement).value;

    const taskData = {
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString()
    };

    try {
        const url = taskId ? `${API_URL}/${taskId}` : API_URL;
        const method = taskId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details || 'Error al guardar la tarea');
        }

        resetForm();
        loadTasks();
    } catch (error) {
        console.error('Error:', error);
        alert(error instanceof Error ? error.message : 'Error al guardar la tarea');
    }
}

// Función para editar una tarea
async function editTask(taskId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/${taskId}`);
        const task = await response.json();

        (document.getElementById('taskId') as HTMLInputElement).value = task._id;
        (document.getElementById('title') as HTMLInputElement).value = task.title;
        (document.getElementById('description') as HTMLTextAreaElement).value = task.description;
        (document.getElementById('startTime') as HTMLInputElement).value = new Date(task.startTime).toISOString().slice(0, 16);
        (document.getElementById('endTime') as HTMLInputElement).value = new Date(task.endTime).toISOString().slice(0, 16);
    } catch (error) {
        console.error('Error al cargar la tarea:', error);
        alert('Error al cargar la tarea');
    }
}

// Función para eliminar una tarea
async function deleteTask(taskId: string): Promise<void> {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }

        loadTasks();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la tarea');
    }
}

// Función para resetear el formulario
function resetForm(): void {
    (document.getElementById('taskForm') as HTMLFormElement).reset();
    (document.getElementById('taskId') as HTMLInputElement).value = '';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    loadTasks();
});
