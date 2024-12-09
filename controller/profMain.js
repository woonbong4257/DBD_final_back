const pool = require('../DB/db')

exports.getProfMain = async (req, res) =>{
  try{
    const user = req.session.user;
    const [selAccept] = await pool.query(`
      SELECT count(accept) as "acc" FROM mission WHERE professor_pro_id = 101101 AND accept = "수락"
      `)
    const [selReject] = await pool.query(`
      SELECT count(accept) as "rej" FROM mission WHERE professor_pro_id = 101101 AND accept = "거절"
      `)
    const [selHold] = await pool.query(`
      SELECT count(accept) as "hold" FROM mission WHERE professor_pro_id = 101101 AND accept = "보류"
      `)
    const [selWait] = await pool.query(` 
      SELECT count(accept) as "wait" FROM mission WHERE professor_pro_id = 101101 AND accept = "대기"
      `)
    //지도학생 미션 수락률
    const mission = [
      Number(selAccept[0].acc),
      Number(selReject[0].rej),
      Number(selHold[0].hold),
      Number(selWait[0].wait)
    ]
    const [totalLead] = await pool.query(`
      SELECT avg(compe_up) as "lead" FROM std_compe_up WHERE compe_name = "리더십" AND term = "24-2"
      `)
    const [totalPlia] = await pool.query(`
      SELECT avg(compe_up) as "plia" FROM std_compe_up WHERE compe_name = "유연성" AND term = "24-2"
      `)
    const [totalOrig] = await pool.query(`
      SELECT avg(compe_up) as "orig" FROM std_compe_up WHERE compe_name = "독창성" AND term = "24-2"
      `)
    const [totalMento] = await pool.query(`
      SELECT avg(compe_up) as "mento" FROM std_compe_up WHERE compe_name = "멘토링" AND term = "24-2"
      `)
    const [totalSelfDev] = await pool.query(`
      SELECT avg(compe_up) as "self" FROM std_compe_up WHERE compe_name = "자기개발" AND term = "24-2"
      `)
    const [totalColla] = await pool.query(`
      SELECT avg(compe_up) as "colla" FROM std_compe_up WHERE compe_name = "협동" AND term = "24-2"
      `)
    //전체학생 역량 성장치(진짜 성장치만...)
    const compeUp = [
      Math.floor(Number(totalLead[0].lead)), 
      Math.floor(Number(totalPlia[0].plia)), 
      Math.floor(Number(totalOrig[0].orig)), 
      Math.floor(Number(totalMento[0].mento)), 
      Math.floor(Number(totalSelfDev[0].self)), 
      Math.floor(Number(totalColla[0].colla))
    ]
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
    res.send({mission: mission, compeUp: compeUp, stdCompeUp: stdCompeUp, holdMission: holdMission})
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