const express= require('express')
const router= express.Router()
const messageCtrl= require('../controllers/message')
const auth= require('../middleware/auth')


router.post('/new', messageCtrl.createMessage)
router.get('/',auth,  messageCtrl.getAllMessages)

router.delete('/:id', auth, messageCtrl.deleteMessage)
router.get('/:id', auth, messageCtrl.getOneMessage)
router.put('/:id', auth,  messageCtrl.modifyMessage )



module.exports=router