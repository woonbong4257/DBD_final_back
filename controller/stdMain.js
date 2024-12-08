const pool = require('../DB/db')

exports.getStdMain = async (req, res) =>{
  try{
    const user = req.session.user;
    const [name] = await pool.query(`
      SELECT name FROM student WHERE std_id = 20200005
      `, [user])
    //성장치
    const [selCompeUp] = await pool.query(`
      SELECT * FROM std_compe_up WHERE std_id = 20200005
      `, [user])
    //총 성장치
    const [selTotalCompe] = await pool.query(`
      SELECT * FROM std_compe WHERE student_std_id = 20200005
      `, [user])
    //씨앗 순위
    const [mySeedRank] = await pool.query(`
      SELECT seed, rnk AS "rank", (1 - (rnk - 1) / total_count) * 100 AS percent
    FROM ( 
    SELECT std_id, seed, RANK() OVER (ORDER BY seed DESC) AS rnk, COUNT(*) OVER () AS total_count 
    FROM student) ranked_students
    WHERE std_id = 20200005
      `, [user])
    //신청한 프로그램 수 
    const [appliProgram] = await pool.query(`
      SELECT count(appli_num) FROM program_appli WHERE student_std_id = 20200005 AND progress_state = "완료"
      `, [user])
    // 프로그램 불러오기 limit 수치는 나중에 알려주세요
    const [programList] = await pool.query(`
      SELECT * FROM program ORDER BY id DESC LIMIT 5
      `)
    res.send({name: name, compeUp: selCompeUp, totalCompe: selTotalCompe, mySeedRank: mySeedRank, appliProgram: appliProgram, programList: programList})
  }
  catch(err){
    console.error(err)
  }
}

exports.postStdMain = async (req,res)=>{
  try{

  }
  catch(err){
    console.error(err)
  }
}