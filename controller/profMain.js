const pool = require('../DB/db')

exports.getProfMain = async (req, res) =>{
  try{
    const user = req.session.user
    //교수 이름
    const[name] = await pool.query(`
      SELECT name FROM professor WHERE pro_id = "101101"
      `, [user])
    //전체학생 역량 성장치
    const [totalCompeUp] = await pool.query(`
      SELECT 
        FLOOR(AVG(CASE WHEN compe_name = '리더십' THEN compe_up END)) as "lead",
        FLOOR(AVG(CASE WHEN compe_name = '유연성' THEN compe_up END)) as "plia",
        FLOOR(AVG(CASE WHEN compe_name = '독창성' THEN compe_up END)) as "orig", 
        FLOOR(AVG(CASE WHEN compe_name = '멘토링' THEN compe_up END)) as "mento",
        FLOOR(AVG(CASE WHEN compe_name = '자기개발' THEN compe_up END)) as "self",
        FLOOR(AVG(CASE WHEN compe_name = '협동' THEN compe_up END)) as "colla"
      FROM std_compe_up 
      WHERE term = '24-2'
    `)
    //전체학생 역량
    const [totalCompe] = await pool.query(`
      SELECT 
        FLOOR(AVG(CASE WHEN compe_name = '리더십' THEN compe_figure END)) as "lead",
        FLOOR(AVG(CASE WHEN compe_name = '유연성' THEN compe_figure END)) as "plia",
        FLOOR(AVG(CASE WHEN compe_name = '독창성' THEN compe_figure END)) as "orig", 
        FLOOR(AVG(CASE WHEN compe_name = '멘토링' THEN compe_figure END)) as "mento",
        FLOOR(AVG(CASE WHEN compe_name = '자기개발' THEN compe_figure END)) as "self",
        FLOOR(AVG(CASE WHEN compe_name = '협동' THEN compe_figure END)) as "colla"
      FROM std_compe
    `)
    //지도학생 역량 성장치
    const [stdCompeUp] = await pool.query(`
      SELECT 
        FLOOR(AVG(CASE WHEN compe_name = '리더십' THEN compe_up END)) as "lead",
        FLOOR(AVG(CASE WHEN compe_name = '유연성' THEN compe_up END)) as "plia", 
        FLOOR(AVG(CASE WHEN compe_name = '독창성' THEN compe_up END)) as "orig",
        FLOOR(AVG(CASE WHEN compe_name = '멘토링' THEN compe_up END)) as "mento",
        FLOOR(AVG(CASE WHEN compe_name = '자기개발' THEN compe_up END)) as "self",
        FLOOR(AVG(CASE WHEN compe_name = '협동' THEN compe_up END)) as "colla"
      FROM std_compe_up A 
      INNER JOIN student B ON A.std_id = B.std_id 
      WHERE term = '24-2' 
      AND B.professor_pro_id = 101101
    `)
    const [stdCompe] = await pool.query(`
      SELECT 
        FLOOR(AVG(CASE WHEN compe_name = '리더십' THEN compe_figure END)) as "lead",
        FLOOR(AVG(CASE WHEN compe_name = '유연성' THEN compe_figure END)) as "plia", 
        FLOOR(AVG(CASE WHEN compe_name = '독창성' THEN compe_figure END)) as "orig",
        FLOOR(AVG(CASE WHEN compe_name = '멘토링' THEN compe_figure END)) as "mento",
        FLOOR(AVG(CASE WHEN compe_name = '자기개발' THEN compe_figure END)) as "self",
        FLOOR(AVG(CASE WHEN compe_name = '협동' THEN compe_figure END)) as "colla"
      FROM std_compe inner join student on std_compe.student_std_id = student.std_id
      WHERE professor_pro_id = 101101
    `)
    //보류 미션 목록
    const [holdMission] = await pool.query(`
      SELECT hold_num, mission_mis_num, compe_name, compe_figure, hold_figure, hold_date FROM hold inner join mission on hold.mission_mis_num = mission.mis_num 
      WHERE mission.professor_pro_id = 101101 AND mission.accept = '보류'
      `)
      //보류 학생 역량 합산
    const [sumFigure] = await pool.query(`
      SELECT SUM(hold_figure) FROM hold WHERE mission_mis_num = ?
      `, [holdMission[0].mission_mis_num])
      //보류 학생 목록
    const [holdStd] = await pool.query(`
      SELECT student.std_id, student.name ,student.grade FROM mission inner join student on mission.student_std_id = student.std_id 
      WHERE student.professor_pro_id = 101101 AND mission.accept = '보류'
      `)
    
    res.send({
      name: name,
      totalCompe: totalCompe, 
      totalCompeUp: totalCompeUp, 
      stdCompeUp: stdCompeUp, 
      holdMission: holdMission, 
      holdStd: holdStd,
      sumFigure: sumFigure
    })
  }
  catch(err){
    console.error(err)
  }
}

exports.postProfMain = async (req,res)=>{
  try{

  }
  catch(err){
    console.error(err)
  }
}