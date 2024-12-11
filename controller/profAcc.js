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
    const {std_id} = req.body

    const [stdCompe] = await pool.query(`
      SELECT 
        compe_name,
        compe_figure
      FROM std_compe
      WHERE std_id = ${std_id}
    `)
    const [stdCompeUp] = await pool.query(`
      SELECT
        compe_up
      FROM std_compe_up
      WHERE std_id = ${std_id} AND term = '24-2'
    `)
    res.send({stdCompe: stdCompe, stdCompeUp: stdCompeUp})
  }
  catch(err){
    console.error(err)
  }
}
