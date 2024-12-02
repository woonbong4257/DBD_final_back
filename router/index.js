const express = require('express');
const router = express.Router();
const main = require('../controller/main') //사용할 컨트롤러 선언
const login = require("../controller/login")
const logout = require("../controller/logout")

//메인 라우터
router.get('/', main.getMain);

router.post("/login", login.postlogin);

router.post("/logout", logout.postLogout)


module.exports = router;