const pool = require('../DB/db')

exports.getHold = async (req, res) => {
  try{
    const user = req.session.user
  // 그냥 케이스 구문 사용시 널값까지 같이 들어옴
    const [compe] = await pool.query(`
      SELECT 
        FLOOR(AVG(CASE WHEN compe_name = '리더십' THEN compe_figure END)) as "lead",
        FLOOR(AVG(CASE WHEN compe_name = '유연성' THEN compe_figure END)) as "plia",
        FLOOR(AVG(CASE WHEN compe_name = '독창성' THEN compe_figure END)) as "orig",
        FLOOR(AVG(CASE WHEN compe_name = '멘토링' THEN compe_figure END)) as "mento", 
        FLOOR(AVG(CASE WHEN compe_name = '자기개발' THEN compe_figure END)) as "self",
        FLOOR(AVG(CASE WHEN compe_name = '협동' THEN compe_figure END)) as "colla"
      FROM mission_compe 
      INNER JOIN mission ON mission_compe.mission_mis_num = mission.mis_num
      WHERE mission.student_std_id = '20200005' AND mission.term = '25-1'
      `, [user])
    res.send({compe: compe})
  }
  catch(err){
    console.error(err)
  }
}


//역량명 안넘어옴
exports.postHold = async (req, res) => {
  try{
    const user = req.session.user
    console.log(user)
    const {compe_figure, mis_num} = req.body
    for(let i = 0; i < compe_figure.length; i++){
      const [insertHold] = await pool.query(`
        INSERT INTO hold VALUES (null,'25-1', ?, 10,?, now(), ?, ?)
        `, [compe_figure[i].compe_name, compe_figure[i].compe_score, user, mis_num[0].mis_num])
    }
    const [updateAccept] = await pool.query(`
      UPDATE mission SET accept = '보류' WHERE mis_num = ?
    `, [mis_num[0].mis_num])
    res.send({msg: 'ok'})
  }
  catch(err){
    console.error(err)
  }
}