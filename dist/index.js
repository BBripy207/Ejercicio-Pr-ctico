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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const tasks_1 = require("./routes/tasks");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Conexión a MongoDB Atlas
const uri = "mongodb+srv://Bbripy:Meliodas7.@bigdata.hvylt3a.mongodb.net/?retryWrites=true&w=majority&appName=BigData";
// MongoClient (para prueba de conexión)
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function connectMongoClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("✅ MongoClient conectado con éxito.");
        }
        catch (error) {
            console.error("❌ Error en MongoClient:", error);
            process.exit(1);
        }
    });
}
// Función principal de inicio
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conectar MongoDB con Mongoose
            yield mongoose_1.default.connect(uri);
            console.log("📦 Mongoose conectado");
            // Probar conexión con MongoClient
            yield connectMongoClient();
            // Configurar rutas
            app.use('/tasks', tasks_1.taskRouter);
            // Iniciar servidor
            const PORT = 3000;
            app.listen(PORT, () => {
                console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error("Error al iniciar el servidor:", error);
            process.exit(1);
        }
    });
}
// Iniciar el servidor
startServer();
