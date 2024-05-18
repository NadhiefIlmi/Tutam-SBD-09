// controllers/todosController.js
const getTodos = async (req, res, pool) => {
    try {
        const result = await pool.query('SELECT * FROM tugas');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createTodo = async (req, res, pool) => {
    try {
        const { judul, deskripsi, deadline, waktu, mata_kuliah } = req.body;
        console.log('Creating tugas:', req.body);
        const result = await pool.query(
            'INSERT INTO tugas (judul, deskripsi, deadline, waktu, mata_kuliah) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [judul, deskripsi, deadline, waktu, mata_kuliah]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating tugas:', err.message);
        res.status(500).send('Server Error');
    }
};

const deleteTodo = async (req, res, pool) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tugas WHERE id = $1', [id]);
        res.json({ message: 'Tugas deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateTodo = async (req, res, pool) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const result = await pool.query(
            'UPDATE tugas SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const todoToEdit = async (req, res, pool) => {
    try {
        const { id } = req.params;
        const { judul, deskripsi, deadline, waktu, mata_kuliah } = req.body;
        const result = await pool.query(
            'UPDATE tugas SET judul = $1, deskripsi = $2, deadline = $3, waktu = $4, mata_kuliah = $5 WHERE id = $6 RETURNING *',
            [judul, deskripsi, deadline, waktu, mata_kuliah, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    todoToEdit,
};
