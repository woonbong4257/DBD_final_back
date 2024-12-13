const pool = require('../DB/db')

exports.postProfHoldAcc = async (req, res) => {
  try {
    const user = req.session.user;
    console.log(req.body.data);
    const {data, type} = req.body

    // 개별 조정
    if (type === "개별") {
    const {compe, mis_num, std_id} = data[0]
      for (let i = 0; i < compe.length; i++) {
        const [updateCompe] = await pool.query(`
          UPDATE mission_compe SET compe_figure = ? WHERE mission_mis_num = ? AND compe_name = ?
        `, [compe[i].hold_figure, mis_num, compe[i].compe_name]);

        const [updateHoldCompe] = await pool.query(`
          UPDATE hold SET hold_figure = ? WHERE mission_mis_num = ? AND compe_name = ?
        `, [compe[i].hold_figure, mis_num, compe[i].compe_name]);
      }
    } else {
    // 전체 조정
    for (let i = 0; i < data.length; i++) {
      const {compe, mis_num, std_id} = data[i]
      for (let i = 0; i < compe.length; i++) {
        const [updateCompe] = await pool.query(`
          UPDATE mission_compe SET compe_figure = ? WHERE mission_mis_num = ? AND compe_name = ?
        `, [compe[i].hold_figure, mis_num, compe[i].compe_name]);

        const [updateHoldCompe] = await pool.query(`
          UPDATE hold SET hold_figure = ? WHERE mission_mis_num = ? AND compe_name = ?
        `, [compe[i].hold_figure, mis_num, compe[i].compe_name]);
      }

      const [updateAccept] = await pool.query(`
        UPDATE mission SET accept = "대기" WHERE mis_num = ?
      `, [mis_num]);
    }
    }

    res.status(200).json({ message: "전송완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오류발생" });
  }
}