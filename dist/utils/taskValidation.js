"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndTransformTaskData = validateAndTransformTaskData;
function validateAndTransformTaskData(input) {
    const { title, description, startTime, endTime } = input;
    // Validar campos requeridos
    if (!title || !startTime || !endTime) {
        return {
            isValid: false,
            error: {
                message: 'Faltan campos requeridos',
                details: 'Los campos title, startTime y endTime son obligatorios'
            }
        };
    }
    // Convertir fechas
    const startDate = new Date(startTime);
    const endDate = new Date(endTime); // Validar fechas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
            isValid: false,
            error: {
                message: 'Fechas inválidas',
                details: 'Las fechas deben estar en formato ISO 8601 (ejemplo: 2025-06-01T15:00:00Z)'
            }
        };
    }
    // Validar que la fecha de inicio sea posterior o igual a la fecha actual
    const now = new Date();
    if (startDate < now) {
        return {
            isValid: false,
            error: {
                message: 'Fecha de inicio inválida',
                details: 'La fecha de inicio debe ser igual o posterior a la fecha actual'
            }
        };
    }
    // Validar que la fecha de fin sea posterior a la fecha de inicio
    if (endDate <= startDate) {
        return {
            isValid: false,
            error: {
                message: 'Fecha de finalización inválida',
                details: 'La hora de finalización debe ser posterior a la hora de inicio'
            }
        };
    }
    // Retornar datos transformados
    return {
        isValid: true,
        data: {
            title: title.trim(),
            description: (description === null || description === void 0 ? void 0 : description.trim()) || '',
            startTime: startDate,
            endTime: endDate
        }
    };
}
