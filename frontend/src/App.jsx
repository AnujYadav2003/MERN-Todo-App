import React, { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/");
    const todos = await response.json();
    setTodos(todos);
  };

  const addTodo = async () => {
    if (todo.trim() === "") return;

    await fetch("http://localhost:3000/addtodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todo }),
    });

    fetchTodos(); 
    setTodo("");
  };

  const handleUpdate = async (id) => {
    const newText = prompt("Enter new text for the todo item:");
    if (newText && newText.trim() !== "") {
      await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, text: newText }), 
      });

      fetchTodos(); 
    }
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }), 
    });

    fetchTodos(); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="border p-2 my-2 flex justify-between items-center">
            {todo.text}
            <div>
              <button
                className="bg-yellow-500 text-white p-2 mr-2"
                onClick={() => handleUpdate(todo._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-2"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
