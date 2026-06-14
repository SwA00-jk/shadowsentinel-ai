const pool = require("../config/database");

const getHistory = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM scan_history ORDER BY scanned_at DESC"
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getHistory
};