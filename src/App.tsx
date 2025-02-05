import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "libs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AuthForm from "features/auth/AuthForm";
import TodosPage from "features/todos/TodosPage";
import type { User } from "firebase/auth";

import "libs/firebase/firebaseConfig";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/todos" /> : <AuthForm />}
        />
        <Route
          path="/todos"
          element={user ? <TodosPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
