const pool = require('./pool');

async function getAllInventory() {
    const result = await pool.query('SELECT * FROM nyanya_activities');
    return result.rows;
}

module.exports = {
    getAllInventory,
};