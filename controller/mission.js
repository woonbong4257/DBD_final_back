const pool = require("../DB/db")
//학생  마이페이지임 
exports.getMission = async (req, res) => {
  try{
    const user = req.session.user
    const [stdInfo] = await pool.query(`
      SELECT * FROM student WHERE std_id = ?
      `, [user])
  const [stdCompe] = await pool.query(`
    SELECT * FROM std_compe WHERE student_std_id = ?
    `, [user])
  const [stdCompeUp] = await pool.query(`
    SELECT compe_name, compe_up FROM std_compe_up WHERE std_id = ? AND term = '24-2'
    `, [user])
  const [pastMission] = await pool.query(`
    SELECT term, accept, final_accept, SUM(compe_figure) as total, progress_date, SUM(progress_figure) as progress, final_date, mis_state, seed 
    FROM mission 
    INNER JOIN mission_compe ON mission.mis_num = mission_compe.mission_mis_num 
    WHERE student_std_id = ? AND term != '25-1'
    GROUP BY term, accept, final_accept, progress_date, final_date, mis_state, seed
    `, [user])
  const [mission] = await pool.query(`
    SELECT mis_num, accept, final_date FROM mission WHERE student_std_id = ? AND term = '25-1'
    `, [user])
    if(mission.length > 0 && mission[0].accept !== '보류'){
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
    console.log(req.body)
    const {type, mis_num}= req.body
    if(type === '수락'){
      const [acceptState] = await pool.query(`
        UPDATE mission SET accept = '수락' , mis_state = '진행', final_accept = now() WHERE term = '25-1' AND mis_num = ?
        `, [mis_num])
      const [missionCompe] = await pool.query(`
        UPDATE mission_compe SET progress_figure = 0 WHERE mission_mis_num = ?
        `, [mis_num])
        console.log("수락")
    }
    else{
      const [rejectState] = await pool.query(`
        UPDATE mission SET accept = '거절' , mis_state = '실패', final_accept = now() WHERE term = '25-1' AND mis_num = ?
        `, [mis_num])
        console.log("거절")
    }
  }
  catch(err){
    console.error(err)
  }
}
