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

exports.getProgramApli = async (req, res) => {
  try{
    const user = req.session.user
    console.log(req.body)
    const {program_id,program_name, compe_name} = req.body
    const [programAppli] = await pool.query(`
      INSERT INTO program_appli VALUES (null, now(), "진행", null, ?, ?, ?, ?)
    `, [compe_name, program_name, program_id, user])
    res.send({message: "신청 완료"})
  }
  catch(err){
    console.error(err)
  }
}

