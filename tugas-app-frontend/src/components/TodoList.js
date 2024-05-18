import React, { useState } from 'react';
import axios from 'axios';
import './TodoList.css';
import EditTodoForm from './EditTodoForm';

const TodoList = ({ todos, updateTodos, handleDelete }) => {
    const [editingTodo, setEditingTodo] = useState(null);

    const handleToggle = async (id) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
            await axios.put(`http://localhost:5000/todos/${id}/completed`, { completed: updatedTodo.completed });
            updateTodos();
        } catch (error) {
            console.error('Error updating tugas:', error);
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        const dayName = date.toLocaleDateString('id-ID', options);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${dayName}, ${day}-${month}-${year}`;
    };

    return (
        <div>
            <table className="todo-table">
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Deadline</th>
                        <th>Waktu</th>
                        <th>Mata Kuliah</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id} id={`todo-${todo.id}`} className="todo-item">
                            <td>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
                                />
                            </td>
                            <td>{todo.judul}</td>
                            <td>{todo.deskripsi}</td>
                            <td>{formatDate(todo.deadline)}</td>
                            <td>{todo.waktu}</td>
                            <td>{todo.mata_kuliah}</td>
                            <td>
                                <button onClick={() => handleEdit(todo)}>Edit</button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingTodo && <EditTodoForm todo={editingTodo} updateTodos={updateTodos} setEditingTodo={setEditingTodo} />}
        </div>
    );
};

export default TodoList;
