import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthForm from "features/auth/AuthForm";
import TodosPage from "features/todos/TodosPage";

import "libs/firebase/firebaseConfig";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
    </div>
  );
};

export default App;
