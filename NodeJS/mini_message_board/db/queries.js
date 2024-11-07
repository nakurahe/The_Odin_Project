const pool = require("./pool");

async function getAllMessages() {
    return (await pool.query("SELECT * FROM messages")).rows;
}

async function insertMessage(input_message) {
    // When destructuring an object, must make sure to use the same key names as the object.
    const { message, username } = input_message;
    await pool.query("INSERT INTO messages (message, username) VALUES ($1, $2)", [message, username]);
}

async function findMessagesByUsername(query_username) {
    // const result = await pool.query("SELECT * FROM messages WHERE username LIKE $1", [`%${query_username}%`]);
    // return result.rows;
    // Cannot use the following line without brackets because pool.query returns a promise,
    // and I need to wait for the promise to resolve before accessing the rows property.
    return (await pool.query("SELECT * FROM messages WHERE username LIKE $1", [`%${query_username}%`])).rows;
}

async function findMessageByID(id) {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result.rows[0];
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
    getAllMessages,
    insertMessage,
    findMessagesByUsername,
    findMessageByID,
    deleteMessage,
};