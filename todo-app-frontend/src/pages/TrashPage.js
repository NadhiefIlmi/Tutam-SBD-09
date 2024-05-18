// TrashPage.jsx
import React from 'react';
import './TrashPage.css';

const TrashPage = ({ deletedTodos, setDeletedTodos }) => {
    const handlePermanentDelete = (id) => {
        const updatedDeletedTodos = deletedTodos.filter(todo => todo.id !== id);
        setDeletedTodos(updatedDeletedTodos);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Intl.DateTimeFormat('id-ID', options).format(date).replace(/-/g, '/');
    };

    return (
        <div className="trash-container">
            <h1>Riwayat Tugas yang Dihapus</h1>
            {deletedTodos.length === 0 ? (
                <p>Tidak ada tugas yang dihapus.</p>
            ) : (
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Deadline</th>
                            <th>Waktu</th>
                            <th>Mata Kuliah</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedTodos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.judul}</td>
                                <td>{todo.deskripsi}</td>
                                <td>{formatDate(todo.deadline)}</td>
                                <td>{todo.waktu}</td>
                                <td>{todo.mata_kuliah}</td>
                                <td>
                                    <button onClick={() => handlePermanentDelete(todo.id)}>Delete Permanent</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrashPage;
