const pool  = require("../DB/db")

exports.postLogout = async(req, res)=>{
  const user = req.session.user
  console.log(user)
  
  /* 로그인에 사용된 세션 삭제 */

  if(user){
    req.session.destroy(()=>{ 
    req.session;
    });
    res.send({msg: "로그아웃 완료"})
  }
  else{
    res.send({msg:"세션 없음"})
  }
  
}