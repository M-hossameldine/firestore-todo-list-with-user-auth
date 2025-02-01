import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, List, message, Flex } from "antd";
import {
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  signOut,
} from "libs/firebase";
import type { Todo } from "types/Todo";

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState({
    updatedTodoId: "",
    addTodoLoading: false,
    updateTodoLoading: false,
    deleteTodoLoading: false,
    getTodosLoading: false,
  });
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  const fetchTodos = useCallback(async () => {
    if (!userId) return;
    setLoading(prevState => ({ ...prevState, getTodosLoading: true }));

    const querySnapshot = await getDocs(
      collection(db, "users", userId, "todos"),
    );
    setTodos(
      querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Todo),
    );

    setLoading(prevState => ({ ...prevState, getTodosLoading: false }));
  }, [userId]);

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId, fetchTodos]);

  const addTodo = async () => {
    if (!userId || !input.trim()) return;
    setLoading(prevState => ({ ...prevState, addTodoLoading: true }));
    try {
      const todoData = {
        title: input,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "users", userId, "todos"),
        todoData,
      );

      setTodos([
        ...todos,
        {
          id: docRef.id,
          ...todoData,
        },
      ]);
      setInput("");
      message.success("Todo added!");
    } catch (error) {
      message.error("Failed to add todo");
    }
    setLoading(prevState => ({ ...prevState, addTodoLoading: false }));
  };

  const updateTodo = async (id: string, newText: string) => {
    if (!userId || !newText.trim()) return;
    setLoading(prevState => ({
      ...prevState,
      updateTodoLoading: true,
      updatedTodoId: id,
    }));
    try {
      await updateDoc(doc(db, "users", userId, "todos", id), {
        title: newText,
      });
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, title: newText } : todo,
        ),
      );
      message.success("Todo updated!");
    } catch (error) {
      message.error("Failed to update todo");
    }
    setLoading(prevState => ({
      ...prevState,
      updateTodoLoading: false,
      updatedTodoId: "",
    }));
  };

  const deleteTodo = async (id: string) => {
    if (!userId) return;
    setLoading(prevState => ({
      ...prevState,
      deleteTodoLoading: true,
      updatedTodoId: id,
    }));
    try {
      await deleteDoc(doc(db, "users", userId, "todos", id));
      setTodos(todos.filter(todo => todo.id !== id));
      message.success("Todo deleted!");
    } catch (error) {
      message.error("Failed to delete todo");
    }
    setLoading(prevState => ({
      ...prevState,
      deleteTodoLoading: false,
      updatedTodoId: "",
    }));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      message.success("Signed out successfully");
      navigate("/"); // Redirect to login page
    } catch (error) {
      message.error("Failed to sign out");
    }
  };

  return (
    <Flex
      vertical
      gap={"1rem"}
      style={{ maxWidth: 400, margin: "auto", padding: 20 }}
    >
      <Flex justify="space-between" align="center">
        <h2 style={{ margin: 0 }}>My Todos</h2>
        <Button type="primary" danger onClick={handleSignOut}>
          Sign Out
        </Button>
      </Flex>
      <Form layout="inline" onFinish={addTodo}>
        <Form.Item style={{ flexGrow: 1 }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a todo..."
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading.addTodoLoading}
        >
          Add
        </Button>
      </Form>

      <List
        bordered
        dataSource={todos}
        loading={loading.getTodosLoading}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                onClick={() =>
                  updateTodo(
                    item.id,
                    prompt("Edit Todo:", item.title) || item.title,
                  )
                }
                loading={
                  loading.updateTodoLoading && item.id === loading.updatedTodoId
                }
              >
                Edit
              </Button>,
              <Button
                danger
                onClick={() => deleteTodo(item.id)}
                loading={
                  loading.deleteTodoLoading && item.id === loading.updatedTodoId
                }
              >
                Delete
              </Button>,
            ]}
          >
            {item.title}
          </List.Item>
        )}
      />
    </Flex>
  );
};

export default TodosPage;
