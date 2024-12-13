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
    console.log(req.body)
  //   const user = req.session.user
  //   const {scores} = req.body
  // const [hold] = await pool.query(`
  //   UPDATE hold SET scores = ? WHERE std_id = ?
  //   `, [scores, user])
  // res.send({hold: hold})
  }
  catch(err){
    console.error(err)
  }
}