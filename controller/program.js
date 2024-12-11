const pool = require('../DB/db')

exports.getProgram = async (req, res) => {
  try{
    const user = req.session.user
    const [program] = await pool.query(`
      SELECT * FROM program WHERE program_name = 'AI 역량검사(AI면접) 대비 면접 컨설팅 프로그램'
    `, [user])
    res.send({program: program})
  }
  catch(err){
    console.error(err)
  }
}