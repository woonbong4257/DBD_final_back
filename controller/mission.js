const pool = require("../DB/db")

exports.getMission = async (req, res) => {
  try{
    const user = req.session.user
    const [stdInfo] = await pool.query(`
      SELECT * FROM student WHERE std_id = '20200005'
      `, [user])
  const [stdCompe] = await pool.query(`
    SELECT * FROM std_compe WHERE student_std_id = '20200005'
    `, [user])
  const [pastMission] = await pool.query(`
    SELECT * FROM mission WHERE student_std_id = '20200005' AND term != '25-1'
    `, [user])
  const [mission] = await pool.query(`
    SELECT accept FROM mission WHERE student_std_id = '20200005' AND term = '25-1'
    `, [user])
    if(mission[0].accept != '보류'){
      const [missionCompe] = await pool.query(`
        SELECT * FROM mission_compe WHERE mission_mis_num = '20200005'
        `, [user])
      res.send({stdInfo: stdInfo, stdCompe: stdCompe, pastMission: pastMission, mission: mission, missionCompe: missionCompe})
    }
    else{
      res.send({stdInfo: stdInfo, stdCompe: stdCompe, pastMission: pastMission, mission: mission, missionCompe: "보류"})
    }
  }
  catch(err){
    console.error(err)
  }
}

exports.postMission = async (req, res) => {
  try{  
    const user = req.session.user
    const {type}= req.body
    const [mission] = await pool.query(`
      SELECT * FROM mission WHERE student_std_id = '20200005' AND term = '25-1'
      `, [user])
    if(type == '수락'){
      const [acceptState] = await pool.query(`
        UPDATE mission SET accept = '수락' WHERE student_std_id = '20200005' AND term = '25-1'
        `, [user])
      const [missionCompe] = await pool.query(`
        UPDATE mission_compe SET progress_figure = 0 WHERE mission_mis_num = ?
        `, [mission[0].mis_num])
    }
    else{
      const [rejectState] = await pool.query(`
        UPDATE mission SET accept = '거절' WHERE student_std_id = '20200005' AND term = '25-1'
        `, [user])
      const [missionCompe] = await pool.query(`
        UPDATE mission_compe SET progress_figure = 0 WHERE mission_mis_num = ?
        `, [mission[0].mis_num])
    }
  }
  catch(err){
    console.error(err)
  }
}
