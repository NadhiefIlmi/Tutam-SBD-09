import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrashPage from './pages/TrashPage';
import './App.css';

function App() {
    const [deletedTodos, setDeletedTodos] = useState(() => {
        const savedDeletedTodos = localStorage.getItem('deletedTodos');
        return savedDeletedTodos ? JSON.parse(savedDeletedTodos) : [];
    });

    return (
        <Router>
            <div className="navbar">
                <Link to="/">TUGAS</Link>
                <Link to="/trash">Sampah</Link>
            </div>
            <Routes>
                <Route 
                    path="/" 
                    element={<HomePage deletedTodos={deletedTodos} setDeletedTodos={setDeletedTodos} />} 
                />
                <Route 
                    path="/trash" 
                    element={<TrashPage deletedTodos={deletedTodos} setDeletedTodos={setDeletedTodos} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
