import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Blog from "./component/blog/Blog";
import BlogDetails from "./component/blog/BlogDetails";
import Navbar from "./component/Navbar";
import Todo from "./component/todo/Todo";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/todo/" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
