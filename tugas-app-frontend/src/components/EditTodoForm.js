import React, { useState } from 'react';
import axios from 'axios';

const EditTodoForm = ({ todo, updateTodos, setEditingTodo }) => {
    const [judul, setJudul] = useState(todo.judul);
    const [deskripsi, setDeskripsi] = useState(todo.deskripsi);
    const [deadline, setDeadline] = useState(todo.deadline.split('T')[0]);
    const [waktu, setWaktu] = useState(todo.waktu);
    const [mataKuliah, setMataKuliah] = useState(todo.mata_kuliah);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDeadline = new Date(deadline).toISOString().split('T')[0];
        const updatedTodo = { ...todo, judul, deskripsi, deadline: formattedDeadline, waktu, mata_kuliah: mataKuliah };
        try {
            await axios.put(`http://localhost:5000/todos/${todo.id}/edit`, updatedTodo);
            updateTodos();
            setEditingTodo(null);
        } catch (error) {
            console.error('Error updating tugas:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Update</button>
        </form>
    );
};

export default EditTodoForm;
