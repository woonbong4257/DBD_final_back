const pool = require("../DB/db")
//학생  마이페이지임 
exports.getMission = async (req, res) => {
  try{
    const user = req.session.user
    const [stdInfo] = await pool.query(`
      SELECT * FROM student WHERE std_id = '20200005'
      `, [user])
  const [stdCompe] = await pool.query(`
    SELECT * FROM std_compe WHERE student_std_id = '20200005'
    `, [user])
  const [stdCompeUp] = await pool.query(`
    SELECT compe_name, compe_up FROM std_compe_up WHERE std_id = '20200005' AND term = '24-2'
    `, [user])
  const [pastMission] = await pool.query(`
    SELECT term, accept, final_accept, SUM(compe_figure) as total, progress_date, SUM(progress_figure), final_date as progress , mis_state, seed 
    FROM mission 
    INNER JOIN mission_compe ON mission.mis_num = mission_compe.mission_mis_num 
    WHERE student_std_id = '20200005' AND term != '25-1'
    GROUP BY term, accept, final_accept, progress_date, mis_state, seed
    `, [user])
  const [mission] = await pool.query(`
    SELECT mis_num, accept, final_date FROM mission WHERE student_std_id = '20200005' AND term = '25-1'
    `, [user])
    if(mission[0].accept == '보류'){
      const [missionCompe] = await pool.query(`
        SELECT * FROM mission_compe WHERE mission_mis_num = ?
        `, [mission[0].mis_num])
      const [missionTotal] = await pool.query(`
        SELECT SUM(compe_figure) as total FROM mission_compe WHERE mission_mis_num = ?
        `, [mission[0].mis_num])
      res.send({stdInfo: stdInfo, stdCompe: stdCompe, stdCompeUp: stdCompeUp, pastMission: pastMission, mission: mission, missionCompe: missionCompe,  missionTotal: missionTotal})
    }
    else{
      res.send({stdInfo: stdInfo, stdCompe: stdCompe, stdCompeUp: stdCompeUp, pastMission: pastMission, mission: mission, missionCompe: "보류"})
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
