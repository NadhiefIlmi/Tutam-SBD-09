// HomePage.jsx
import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import axios from 'axios';
import './HomePage.css';

const HomePage = ({ deletedTodos, setDeletedTodos }) => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const updateTodos = async () => {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
    };

    useEffect(() => {
        updateTodos();
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
    }, [deletedTodos]);

    const handleDelete = async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        if (todoToDelete) {
            setDeletedTodos([...deletedTodos, todoToDelete]);
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);

            await axios.delete(`http://localhost:5000/todos/${id}`);
        }
    };

    const getCurrentDateTime = () => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Intl.DateTimeFormat('id-ID', options).format(currentTime);
    };

    return (
        <div className="container">
            <h1>Daftar Tugas</h1>
            <div className="current-date-time">{getCurrentDateTime()}</div>
            <div className="centered">
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Tutup Form' : 'Tambah Tugas'}
                </button>
                {showForm && <TodoForm updateTodos={updateTodos} />}
                {!showTrash ? (
                    <TodoList todos={todos} updateTodos={updateTodos} handleDelete={handleDelete} />
                ) : null}
            </div>
        </div>
    );
};

export default HomePage;