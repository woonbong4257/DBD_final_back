const pool = require('../DB/db')

exports.getHold = async (req, res) => {
  try{
    const user = req.session.user
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

exports.postHold = async (req, res) => {
  try{

  }
  catch(err){
    console.error(err)
  }
}