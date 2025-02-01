import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "../firebaseConfig";
import type { Todo, TodoId } from "../../../types/Todo";
import type { UserId } from "../../../types/User";

export type AddTodoProps = {
  userId: UserId;
  todo: Todo;
};
export const addTodo = async ({ userId, todo }: AddTodoProps) => {
  return await addDoc(collection(db, "users", userId, "todos"), todo);
};

export const getTodos = async (userId: UserId) => {
  const q = query(collection(db, "users", userId, "todos"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export type UpdateTodoProps = {
  userId: UserId;
  todoId: TodoId;
  updatedTodo: Todo;
};
export const updateTodo = async ({
  userId,
  todoId,
  updatedTodo,
}: UpdateTodoProps) => {
  return await updateDoc(
    doc(db, "users", userId, "todos", todoId),
    updatedTodo,
  );
};

export type DeleteTodoProps = {
  userId: UserId;
  todoId: TodoId;
};
export const deleteTodo = async ({ userId, todoId }: DeleteTodoProps) => {
  return await deleteDoc(doc(db, "users", userId, "todos", todoId));
};
