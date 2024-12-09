const pool = require('../DB/db')

exports.getProfAcc = async (req, res) => {
  try{
    const user = req.session.user
    const [[selAccept]] = await pool.query(`
      SELECT 
        COUNT(CASE WHEN accept = "수락" THEN 1 END) as "acc",
        COUNT(CASE WHEN accept = "거절" THEN 1 END) as "rej",
        COUNT(CASE WHEN accept = "보류" THEN 1 END) as "hold",
        COUNT(CASE WHEN accept = "대기" THEN 1 END) as "wait"
      FROM mission 
      WHERE professor_pro_id = 101101 AND term = '25-1'
    `)
    res.send({selAccept: selAccept})
  }
  catch(err){
    console.error(err)
  }
}

exports.postProfAcc = async (req, res) => {
  try{
    const user = req.session.user
  }
  catch(err){
    console.error(err)
  }
}
