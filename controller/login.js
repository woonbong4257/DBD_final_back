const pool = require("../DB/db")

/* 모든 컨트롤러는 오류를 잡아내기 위해 try, catch구문을 사용함 */
/* 로그인 이후에 학생 교수 판단이 모호하여 어느 테이블을 조회했는지에 따라 type을 저장 */
/* 참고: 데이터베이스에 세션을 저장하게되면 req.session.변수명 형태로 담고 값은 객체형태로 저장됨 */

exports.postlogin = async (req, res) => {
  try {
    const { id, pw } = req.body.info;

    console.log("id: ", id, "pw: ", pw)
    
    const [selStdInfo] = await pool.query(
      `SELECT * FROM student WHERE std_id = ? AND pw = ?`,
      [id, pw]
    );

    if (selStdInfo.length > 0) {
      req.session.user = id;
      req.session.type = "std";
      req.session.save((err) => {
        if (err) {
          console.error("Session:", err);
          return res.status(500).send({msg: "세션 저장 에러"});
        }
        res.status(200).send({type: "std",msg: "로그인 성공"});
      });
    } else {
      const [selProfInfo] = await pool.query(
        `SELECT * FROM professor WHERE pro_id = ? AND pw = ?`,
        [id, pw]
      );

      if (selProfInfo.length > 0) {
        req.session.user = id;
        req.session.type = "prof";
        req.session.save((err) => {
          if (err) {
            console.error("Session:", err);
            return res.status(500).send({msg: "세션 저장 에러"});
          }
          res.status(200).send({type: "prof", msg: "로그인 성공"}); //정상적으로 세션저장이 완료되면 msg를 프론트로 전송
        });
      } else {
        res.status(401).send("세션 없음");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("서버를 확인해주세요");
  }
};
