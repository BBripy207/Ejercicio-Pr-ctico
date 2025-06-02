import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { taskRouter } from './routes/tasks';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Conexión a MongoDB Atlas
const uri = "mongodb+srv://Bbripy:Meliodas7.@bigdata.hvylt3a.mongodb.net/?retryWrites=true&w=majority&appName=BigData";


// MongoClient (para prueba de conexión)
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectMongoClient() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoClient conectado con éxito.");
    } catch (error) {
        console.error("❌ Error en MongoClient:", error);
        process.exit(1);
    }
}

// Función principal de inicio
async function startServer() {
    try {
        // Conectar MongoDB con Mongoose
        await mongoose.connect(uri);
        console.log("📦 Mongoose conectado");

        // Probar conexión con MongoClient
        await connectMongoClient();

        // Configurar rutas
        app.use('/tasks', taskRouter);

        // Iniciar servidor
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
}

// Iniciar el servidor
startServer();
