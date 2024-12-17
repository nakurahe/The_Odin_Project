const pool = require('./pool');

async function getAllInventory() {
    const result = await pool.query('SELECT * FROM nyanya_activities');
    return result.rows;
}

async function getInventoryById(id) {
    const result = await pool.query('SELECT * FROM nyanya_activities WHERE id = $1', [id]);
    return result.rows[0];
}

async function getPurchaseHistoryByItemId(itemId) {
    const result = await pool.query('SELECT * FROM purchase_history WHERE item_id = $1', [itemId]);
    return result.rows;
}

module.exports = {
    getAllInventory,
    getInventoryById,
    getPurchaseHistoryByItemId,
};