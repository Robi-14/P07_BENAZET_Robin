const models = require('../models')
const jwt = require ('jsonwebtoken');
const message = require('../models/message');

exports.likeMessage = (res, req, next )=>{

// recuperation de l'user Id dans le token
const token = req.headers.authorization.split (' ')[1]; 
const decodedToken= jwt.verify(token, `${process.env.TOKEN}` );
const userId = decodedToken.userId;

const messageId= parseInt(req.params.messageId)

models.Message.findOne({
    where: { id: messageId}

})
.then((message)=>{
if (!message){ return res.status(401).json({ error: 'messagee non trouvé !' })}})
.catch(err=> res.status(500).json({ error:'impossible de verifier le message'}))

models.User.findOne({
    where:{id: UserId}
})
.then(user =>{
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
}).catch(err=> res.status(500).json({ error:'impossible de verifier l\'utilisateur'}))

models.Like.findOne({
where:{
    userId:userId,
    messageId: messageId

}})
.then((userAlreadyLiked)=>{
    if (userAlreadyLiked){return res.status(409).json({ error: 'post dejà liké  !' });
        
    } message.addUser(user)
    .then((userlike)=> res.status(200).json({ message: "user ajouté !" })) })
    .catch(err=> res.status(500).json({ error:'impossible d\'ajouter l\'utilisateur'}))

message.update({
    likes : message.likes +1,})
    .then (()=> res.status(200).json({ message: "post liké" })) 
    .catch(err=> res.status(500).json({ error:'impossible de liké la sauce'}))





}