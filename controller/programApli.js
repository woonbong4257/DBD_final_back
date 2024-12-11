const pool = require('../DB/db')

exports.getProgramApli = async (req, res) => {
  try{
    const user = req.session.user
    const [programAppli] = await pool.query(`
      SELECT program_name, apli_start, apli_final, progress_start, progress_final FROM program WHERE program_name = 'AI 역량검사(AI면접) 대비 면접 컨설팅 프로그램'
    `, [user])
    res.send({programAppli: programAppli})
  }
  catch(err){
    console.error(err)
  }
}
