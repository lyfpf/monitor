const router = require('koa-router')({
  prefix: '/api'
})

const controllers = require('../controllers')

// user
router.post('/user/login', controllers.user.login)

router.post('/user/verify_token', controllers.user.verifyToken)

router.get('/user/captcha', controllers.user.captcha)

router.post('/user/add_user', controllers.user.addUser)

router.post('/user/detail_info', controllers.user.detailInfo)

router.post('/user/update_info', controllers.user.updateInfo)

router.post('/user/update_password', controllers.user.updatePassword)

router.post('/user/delete_user', controllers.user.deleteUser)

router.get('/user/user_info', controllers.user.userInfo)

router.post('/user/all_user', controllers.user.allUser)

router.post('/user/update_avatar', controllers.user.avatar)

// monitor
router.get('/monitor/all_monitor', controllers.monitor.allMonitor)

router.get('/monitor/get_by_id_monitor', controllers.monitor.getByIdMonitor)

router.post('/monitor/add_monitor', controllers.monitor.addMonitor)

router.post('/monitor/update_monitor', controllers.monitor.updateMonitor)

router.post('/monitor/delete_monitor', controllers.monitor.deleteMonitor)

// errorInfo
router.get('/errorInfo/all_info', controllers.errorInfo.allInfo)

router.post('/errorInfo/delete_info', controllers.errorInfo.deleteInfo)

module.exports = router