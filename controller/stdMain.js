const pool = require('../DB/db')

exports.getStdMain = async (req, res) =>{
  try{
    const user = req.session.user
    console.log(user, "asd");
    const [name] = await pool.query(`
      SELECT name, std_state, grade FROM student WHERE std_id = ?
      `, [user])
    //성장치
    const [selCompeUp] = await pool.query(`
      SELECT * FROM std_compe_up WHERE std_id = ?
      `, [user])
    //총 성장치
    const [selTotalCompe] = await pool.query(`
      SELECT * FROM std_compe WHERE student_std_id = ?
      `, [user])
    //씨앗 순위
    const [mySeedRank] = await pool.query(`
      SELECT seed, rnk AS "rank", FLOOR(((rnk - 1) / total_count) * 100) AS percent
    FROM ( 
    SELECT std_id, seed, RANK() OVER (ORDER BY seed DESC) AS rnk, COUNT(*) OVER () AS total_count 
    FROM student) ranked_students
    WHERE std_id = ?
      `, [user])
    //신청한 프로그램 수 
    const [programStats] = await pool.query(`
      SELECT 
        COUNT(appli_num) as "appli",
        SUM(CASE WHEN progress_state = "이수" THEN 1 ELSE 0 END) as "isu",
        SUM(CASE WHEN progress_state = "미이수" THEN 1 ELSE 0 END) as "miisu"
      FROM program_appli 
      WHERE student_std_id = ?
      `, [user])
    //추천 프로그램
    const [recommendProgram] = await pool.query(`
      SELECT program.* FROM program_appli inner join student ON program_appli.student_std_id = student.std_id inner join program ON program_appli.program_id = program.id 
      WHERE student.grade = ? ORDER BY program_appli.appli_num DESC LIMIT 5
      `, [name[0].grade])
    // 프로그램 불러오기 limit 수치는 나중에 알려주세요
    const [programList] = await pool.query(`
      SELECT * FROM program ORDER BY id DESC LIMIT 5
      `)
    const [selAccept] = await pool.query(`
      SELECT accept FROM mission WHERE student_std_id = ? AND term = '25-1'
      `, [user])

    const response = {
      name: name,
      compeUp: selCompeUp,
      totalCompe: selTotalCompe,
      mySeedRank: mySeedRank,
      programList: programList,
      recommendProgram: recommendProgram,
      selAccept: selAccept,
      programStats: programStats
    };
    // 미션 수락 여부 
    if (selAccept[0].accept == "수락") {
      const [acceptMission] = await pool.query(`
        SELECT compe_name, compe_figure, progress_figure FROM mission_compe inner join mission ON mission_compe.mission_mis_num = mission.mis_num 
        WHERE student_std_id = ? AND term = '25-1'
        `, [user]);
      response.acceptMission = acceptMission;
    }

    res.send(response);
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