import "./App.css";
import "libs/firebase/firebaseConfig";

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useInitAppAuth } from "hooks";

import LoadingSpinner from "components/LoadingSpinner";

const AuthForm = React.lazy(() => import("features/auth/AuthForm"));
const TodosPage = React.lazy(() => import("features/todos/TodosPage"));

const App = () => {
  const { user, loading } = useInitAppAuth();

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
