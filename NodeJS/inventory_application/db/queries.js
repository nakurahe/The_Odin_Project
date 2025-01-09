const pool = require('./pool');

async function getAllInventory() {
    const result = await pool.query('SELECT * FROM nyanya_activities');
    return result.rows;
}

async function getInventoryById(id) {
    const result = await pool.query('SELECT * FROM nyanya_activities WHERE id = $1', [id]);
    return result.rows[0];
}

// async function getPurchaseHistoryByItemId(itemId) {
//     const result = await pool.query('SELECT * FROM purchase_history WHERE item_id = $1', [itemId]);
//     return result.rows;
// }
async function getKRandomInventory(k) {
    const result = await pool.query('SELECT * FROM nyanya_activities ORDER BY random() LIMIT $1', [k]);
    return result.rows;
}

async function createItem({ name, description, energy_level, provider, genre }) {
    await pool.query(
        'INSERT INTO nyanya_activities (name, description, energy_level, provider, genre) VALUES ($1, $2, $3, $4, $5)',
        [name, description, energy_level, provider, genre]
    );
}

module.exports = {
    getAllInventory,
    getInventoryById,
    // getPurchaseHistoryByItemId,
    getKRandomInventory,
    createItem,
};