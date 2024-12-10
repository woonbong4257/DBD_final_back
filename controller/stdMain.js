const pool = require('../DB/db')

exports.getStdMain = async (req, res) =>{
  try{
    const user = req.session.user;
    const [name] = await pool.query(`
      SELECT name, std_state, grade FROM student WHERE std_id = 20200005
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
      SELECT seed, rnk AS "rank", FLOOR(((rnk - 1) / total_count) * 100) AS percent
    FROM ( 
    SELECT std_id, seed, RANK() OVER (ORDER BY seed DESC) AS rnk, COUNT(*) OVER () AS total_count 
    FROM student) ranked_students
    WHERE std_id = 20200005
      `, [user])
    //신청한 프로그램 수 
    const [appliProgram] = await pool.query(`
      SELECT COUNT(appli_num) as "appli"
      FROM program_appli WHERE student_std_id = 20200005
      `, [user])
    const [isuProgram] = await pool.query(`
      SELECT COUNT(appli_num) as "isu"
      FROM program_appli WHERE student_std_id = 20200005 AND progress_state = "이수"
      `, [user])
    const [miisuProgram] = await pool.query(`
      SELECT COUNT(appli_num) as "miisu"
      FROM program_appli WHERE student_std_id = 20200005 AND progress_state = "미이수"
      `, [user])
      const stdProgram = {appli: appliProgram[0].appli, isu: isuProgram[0].isu, miisu: miisuProgram[0].miisu}
    const [recommendProgram] = await pool.query(`
      SELECT * FROM program_appli inner join student ON program_appli.student_std_id = student.std_id 
      WHERE student.grade = 1 ORDER BY program_appli.appli_num DESC LIMIT 5
      `, [name.grade])
    // 프로그램 불러오기 limit 수치는 나중에 알려주세요
    const [programList] = await pool.query(`
      SELECT * FROM program ORDER BY id DESC LIMIT 5
      `)
    const [selAccept] = await pool.query(`
      SELECT accept FROM mission WHERE student_std_id = 20200005
      `, [user])

    const response = {
      name: name,
      compeUp: selCompeUp,
      totalCompe: selTotalCompe,
      mySeedRank: mySeedRank,
      stdProgram: stdProgram,
      programList: programList,
      recommendProgram: recommendProgram,
    };
    // 미션 수락 여부
    if (selAccept[0].accept == "수락") {
      const [acceptMission] = await pool.query(`
        SELECT * FROM mission_compe inner join mission ON mission_compe.mission_mis_num = mission.mis_num 
        WHERE student_std_id = 20200005 AND term = '25-1'
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