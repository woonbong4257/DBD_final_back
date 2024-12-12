const pool = require('../DB/db')

exports.postMissionProgram = async (req, res) => {
  try{
    const user = req.session.user
    const {term} = req.body
    if(term === '24-2'){
    const [missionProgram] = await pool.query(`
      SELECT * FROM program_appli WHERE appli_date >= '2024-09-01' AND appli_date < '2025-03-02' AND student_std_id = '20200005'
    `, [user])
    res.send({missionProgram: missionProgram})
    } 
  }
  catch(err){
    console.error(err)
  }
}