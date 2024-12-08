const pool = require("../DB/db")

exports.getMain = async(req, res) =>{
  try{
    //미션 수락률 update_time은 갱신 날짜
    const [selMisAccept] = await pool.query(`
      SELECT term, update_time, state, std_num 
      FROM mission_accept WHERE term = '24-2'`)
    //미션 이수율
    const [selMisClear] = await pool.query(`
      SELECT term, isu_state, std_num FROM mission_clear WHERE term = '24-1'
      `)
    //씨앗 많은 5명
    const [seedRank] = await pool.query(`
    SELECT name, seed, RANK() OVER(ORDER BY seed DESC) AS 'rank' FROM student LIMIT 5
    `)  
    console.log("data: ", seedRank)
    // 프로그램 불러오기 limit 수치는 나중에 알려주세요
    const [programList] = await pool.query(`
      SELECT * FROM program ORDER BY id DESC LIMIT 5
      `)
    // 성장치 높은 5명
    const [selCompeUp] = await pool.query(`
      SELECT name, compe_name, compe_up, term FROM std_compe_up ORDER BY compe_up DESC LIMIT 5
      `)
    res.send({misAcc: selMisAccept, misClear: selMisClear, seedRank: seedRank, programList: programList, compeUp: selCompeUp})
  }
  catch(err){
    console.error(err)
  }
}