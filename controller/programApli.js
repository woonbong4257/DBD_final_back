const pool = require('../DB/db')

exports.getProgramApli = async (req, res) => {
  try{
    const user = req.session.user
    const [programAppli] = await pool.query(`
      SELECT program_name, apli_start, apli_final, progress_start, progress_final FROM program WHERE program_name = 'AI 역량검사(AI면접) 대비 면접 컨설팅 프로그램'
    `, [user])
    const[appliForm] = await pool.query(`
      SELECT * FROM appli_form WHERE user_id = 20206789
    `, [user])
    res.send({programAppli: programAppli, appliForm: appliForm})
  }
  catch(err){
    console.error(err)
  }
}

exports.postProgramApli = async (req, res) => {
  try{
    const user = req.session.user
    console.log(user)
    console.log(req.body)
    const {program_id,program_name, compe_name} = req.body
    const [programAppli] = await pool.query(`
      INSERT INTO program_appli VALUES (null, now(), "진행", null, ?, ?, ?, ?)
    `, [compe_name, program_name, program_id, user])
    const [selectRecently] = await pool.query(`
      SELECT std_state FROM student WHERE std_id = ?
    `, [user])
    if(selectRecently[0].std_state === '휴면'){
      const [updateRecently] = await pool.query(`
        UPDATE student SET recently = now(), std_state = '복귀' WHERE std_id = ?
      `, [user])
      const [insertSeed] = await pool.query(`
        INSERT INTO seed_list VALUES (null, '복귀 프로그램 신청', 1,now(),"복귀", ?)
      `, [user])
      const [selectSeed] = await pool.query(` 
        SELECT SUM(get_point) as total FROM seed_list WHERE std_id = ?
      `, [user])
      const [updateSeed] = await pool.query(`
        UPDATE student SET seed = ? WHERE std_id = ?
      `, [Number(selectSeed[0].total), user])
      
    }
    res.send({message: "신청 완료"})
  }
  catch(err){
    console.error(err)
  }
}

