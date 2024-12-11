const express = require('express');
const router = express.Router();
const main = require('../controller/main') //사용할 컨트롤러 선언
const login = require("../controller/login")
const logout = require("../controller/logout")
const profMain = require("../controller/profMain")
const stdMain = require("../controller/stdMain")
const mission = require("../controller/mission")
const hold = require("../controller/hold")
const profAcc = require("../controller/profAcc")
const profHoldAcc = require("../controller/profHoldAcc")
const program = require("../controller/program")
const programApli = require("../controller/programApli")

//메인 라우터
router.get('/', main.getMain);
router.get('/stdmain', stdMain.getStdMain)
router.get('/profmain', profMain.getProfMain)


router.post("/login", login.postlogin);

router.post("/logout", logout.postLogout)

router.get("/mission", mission.getMission)
router.post("/mission", mission.postMission)

router.get("/hold", hold.getHold)
router.post("/hold", hold.postHold)

router.get("/profacc", profAcc.getProfAcc)
router.post("/profacc", profAcc.postProfAcc)

router.post("/profholdacc", profHoldAcc.postProfHoldAcc)

router.get("/program", program.getProgram)
router.get("/programApli", programApli.getProgramApli)
module.exports = router;