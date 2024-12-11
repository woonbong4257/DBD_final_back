const pool = require('../DB/db')

exports.postProfHoldAcc = async (req, res) => {
  try{
    const user = req.session.user
    console.log(req.body)
    // const {compe, mis_num, std_id, type} = req.body
    // console.log(compe, mis_num, std_id, type)
    // if(type === "개별"){
    //   for(let i = 0; i < compe.length; i++){
    //     const [updateCompe] = await pool.query(`
    //     UPDATE mission_compe SET compe_figure = ${compe[i].hold_figure} WHERE mission_mis_num = ${mis_num} AND compe_name = '${compe[i].compe_name}'
    //   `)
    //   const [updateHoldCompe] = await pool.query(`
    //     UPDATE hold SET hold_figure = ${compe[i].hold_figure} WHERE mission_mis_num = ${mis_num} AND compe_name = ?
    //     `, [compe[i].compe_name])
    //   }
    // }
    // // else{
    // //   for(let i = 0; i < compe.length; i++){
    // //     const [updateCompe] = await pool.query(`
    // //     UPDATE mission_compe SET compe_figure = ${compe[i].hold_figure} WHERE mission_mis_num = ${mis_num} AND compe_name = ${compe[i].compe_name}
    // //   `)
    // //   const [updateHoldCompe] = await pool.query(`
    // //     UPDATE hold SET hold_figure = ${compe[i].hold_figure} WHERE mission_mis_num = ${mis_num} AND compe_name = ${compe[i].compe_name}
    // //     `)
    // //   }
    // // }
    // const [updateAccept] = await pool.query(`
    //   UPDATE mission SET accept = "대기" WHERE mis_num = ${mis_num}
    // `)
    // res.status(200).json({message: "전송완료"})
  }
  catch(err){
    console.error(err)
    res.status(500).json({message: "오류발생"})
  }
}
