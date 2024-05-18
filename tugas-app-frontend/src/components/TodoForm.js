import React, { useState } from 'react';
import axios from 'axios';
import './TodoForm.css';

const TodoForm = ({ updateTodos }) => {
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [deadline, setDeadline] = useState('');
    const [waktu, setWaktu] = useState('');
    const [mataKuliah, setMataKuliah] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDeadline = deadline.split('T')[0];
        const newTodo = {
            judul,
            deskripsi,
            deadline: formattedDeadline,
            waktu,
            mata_kuliah: mataKuliah
        };
        console.log('Submitting tugas:', newTodo);
        try {
            await axios.post('http://localhost:5000/todos', newTodo);
            setJudul('');
            setDeskripsi('');
            setDeadline('');
            setWaktu('');
            setMataKuliah('');
            updateTodos();
        } catch (error) {
            console.error('Error submitting tugas:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul"
                required
            />
            <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi"
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <input
                type="text"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                placeholder="Waktu (HH:MM)"
            />
            <input
                type="text"
                value={mataKuliah}
                onChange={(e) => setMataKuliah(e.target.value)}
                placeholder="Mata Kuliah"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;
