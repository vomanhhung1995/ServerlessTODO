import { TodosAccess } from '../dataLayer/todosAccess'
import { AttachmentUtils } from '../fileStorage/attachmentUtils'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodosAccess();
const attachmentAccess = new AttachmentUtils();

export async function getTodosForUser(userId: string) {
    return todoAccess.getTodosForUser(userId);
}

export async function createTodosForUser(item: object) {
    return todoAccess.createTodosForUser(item);
}

export async function deleteTodosForUser(todoId: String, userId: String) {
    return todoAccess.deleteTodo(todoId, userId);
}

export async function updateTodosForUser(todoId: String, userId: String, data: UpdateTodoRequest) {
    return todoAccess.updateTodo(todoId, userId, data);
}

export async function deleteImageTodo(todoId: String, userId: String) {
    return todoAccess.deleteImageTodo(todoId, userId);
}

export async function createAttachmentPresignedUrl(todoId: String, userId: String, attachmentUrl: String) {
    return attachmentAccess.updateTodoAttachmentUrl(todoId, userId, attachmentUrl);
}

export async function getUploadUrl(imageId: String) {
    return attachmentAccess.getUploadUrl(imageId);
}
