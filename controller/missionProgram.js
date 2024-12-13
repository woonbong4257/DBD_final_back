const pool = require('../DB/db')

exports.postMissionProgram = async (req, res) => {
  try{
    const user = req.session.user
    console.log(user)
    const {term} = req.body
    
    const [missionProgram] = await pool.query(`
      SELECT program_appli.compe_name, compe_figure, program.program_name, program.progress_start, program.progress_final, program_appli.progress_state FROM program_appli 
      inner join program on program_appli.program_id = program.id WHERE appli_date >= '2024-03-01' AND appli_date < '2024-09-01' AND student_std_id = ?
    `, [user])
    console.log(missionProgram)
    res.send({missionProgram: missionProgram})
  }
  catch(err){
    console.error(err)
  }
}