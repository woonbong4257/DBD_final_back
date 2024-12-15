const pool = require("../DB/db");

exports.getSeedList = async (req, res) => {
  try {
    const user = req.session.user;
    const [seedList] = await pool.query("SELECT * FROM seed_list WHERE std_id = ? order by get_date desc", [user]);
    const [selStdSeed] = await pool.query("SELECT seed FROM student WHERE std_id = ?", [user]);
    res.send({ seedList: seedList, selStdSeed: selStdSeed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
