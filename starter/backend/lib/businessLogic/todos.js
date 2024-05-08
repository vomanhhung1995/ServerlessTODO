"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadUrl = exports.createAttachmentPresignedUrl = exports.deleteImageTodo = exports.updateTodosForUser = exports.deleteTodosForUser = exports.createTodosForUser = exports.getTodosForUser = void 0;
const todosAccess_1 = require("../dataLayer/todosAccess");
const attachmentUtils_1 = require("../fileStorage/attachmentUtils");
const todoAccess = new todosAccess_1.TodosAccess();
const attachmentAccess = new attachmentUtils_1.AttachmentUtils();
async function getTodosForUser(userId) {
    return todoAccess.getTodosForUser(userId);
}
exports.getTodosForUser = getTodosForUser;
async function createTodosForUser(item) {
    return todoAccess.createTodosForUser(item);
}
exports.createTodosForUser = createTodosForUser;
async function deleteTodosForUser(todoId, userId) {
    return todoAccess.deleteTodo(todoId, userId);
}
exports.deleteTodosForUser = deleteTodosForUser;
async function updateTodosForUser(todoId, userId, data) {
    return todoAccess.updateTodo(todoId, userId, data);
}
exports.updateTodosForUser = updateTodosForUser;
async function deleteImageTodo(todoId, userId) {
    return todoAccess.deleteImageTodo(todoId, userId);
}
exports.deleteImageTodo = deleteImageTodo;
async function createAttachmentPresignedUrl(todoId, userId, attachmentUrl) {
    return attachmentAccess.updateTodoAttachmentUrl(todoId, userId, attachmentUrl);
}
exports.createAttachmentPresignedUrl = createAttachmentPresignedUrl;
async function getUploadUrl(imageId) {
    return attachmentAccess.getUploadUrl(imageId);
}
exports.getUploadUrl = getUploadUrl;
//# sourceMappingURL=todos.js.map