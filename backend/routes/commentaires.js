const express= require('express')
const router= express.Router()
const commentairesCtrl= require('../controllers/commentaires')
const auth= require('../middleware/auth')


router.post('/:messageId/commentaires', auth, commentairesCtrl.createCommentaires)
router.post('/:messageId/commentaires', auth, commentairesCtrl.createCommentaires)
router.put('/:messageId/commentaires/:id', auth,  commentairesCtrl.modifyCommentaire )
router.delete('/:messageId/commentaires/:id', auth,  commentairesCtrl.deleteCommentaire )
router.get('/:messageId/commentaires', auth, commentairesCtrl.getAllCommentaires)



module.exports=router