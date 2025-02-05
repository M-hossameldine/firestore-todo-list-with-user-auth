import "./App.css";
import "libs/firebase/firebaseConfig";

import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "libs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import LoadingSpinner from "components/LoadingSpinner";

const AuthForm = React.lazy(() => import("features/auth/AuthForm"));
const TodosPage = React.lazy(() => import("features/todos/TodosPage"));

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
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </div>
  );
};

export default App;
