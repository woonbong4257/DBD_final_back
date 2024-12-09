const pool = require('../DB/db')

exports.getProfMain = async (req, res) =>{
  try{
    const user = req.session.user;
    const [[selAccept]] = await pool.query(`
      SELECT 
        COUNT(CASE WHEN accept = "수락" THEN 1 END) as "acc",
        COUNT(CASE WHEN accept = "거절" THEN 1 END) as "rej",
        COUNT(CASE WHEN accept = "보류" THEN 1 END) as "hold",
        COUNT(CASE WHEN accept = "대기" THEN 1 END) as "wait"
      FROM mission 
      WHERE professor_pro_id = 101101
    `)
    
    const [totalCompe] = await pool.query(`
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
    //전체학생 역량 성장치(진짜 성장치만...)

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
    const [holdMission] = await pool.query(`
      SELECT * FROM hold inner join mission on hold.mission_mis_num = mission.mis_num WHERE mission.professor_pro_id = 101101 AND mission.accept = '보류'
      `)
    res.send({selAccept: selAccept, totalCompe: totalCompe, stdCompeUp: stdCompeUp, holdMission: holdMission})
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