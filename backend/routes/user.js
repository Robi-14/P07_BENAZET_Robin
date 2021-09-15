const express= require('express')
const router= express.Router()
const userCtrl= require('../controllers/user')
const auth= require('../middleware/auth')

router.post('/register', userCtrl.signup)
router.post ('/login', userCtrl.login)

router.get('/:id' , auth, userCtrl.getUserProfile)
router.put('/profil', auth, userCtrl.updateUserProfile)


module.exports=router