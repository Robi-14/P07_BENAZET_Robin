const models = require('../models')
const fs = require("fs")
const jwt = require ('jsonwebtoken')


// route

exports.createMessage=(req, res, next)=>{
    // recuperation de l'user Id dans le token
    const token = req.headers.authorization.split (' ')[1]; 
    const decodedToken= jwt.verify(token, `${process.env.TOKEN}` );
    const userId = decodedToken.userId;

    const content = req.body.content
    models.User.findOne({
        where:{id: userId}})
    .then(user =>{
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
    }).catch(err=> res.status(500).json({ error:'impossible de verifier l\'utilisateur'}))
    
    
    models.Message.create({
        content:content,
        likes:0,
        UserId: userId
    })
    .then(message => res.status(201).json(message))
    .catch(err=> res.status(400).json({ error}))
}

exports.getAllMessages=(req, res, next)=>{

// liste les message par un ordre 
const order = req.query.order

models.Message.findAll({
order :[
    ['createdAt','DESC' ]
],
include : [{
    model: models.User,
    attributes: ['firstname', 'lastname']
}]

})
.then(messages =>res.status(200).json(messages) )
.catch(error=> res.status(400).json({error}))





}

exports.getOneMessage= (req,res,next)=> {
models.Message.findOne({where:{id : req.params.id}})
.then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }))




}






exports.deleteMessage= (req, res, next)=>{
models.Message.findOne({
where:{id : req.params.id}})
.then((message) => {
  
     models.Message.destroy({ where:{id : req.params.id} })
        .then(() => res.status(200).json({ message: "message supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  }


exports.modifyMessage =(req, res, next)=> {
    const token = req.headers.authorization.split (' ')[1]; 
    const decodedToken= jwt.verify(token, `${process.env.TOKEN}` );
    const userId = decodedToken.userId;

    models.Message.findOne({
        where:{id : userId}})
        .then((message)=>{
            const messageObject =  { ...req.body };
    models.Message.update(
    { content: req.body.content },
    {where:{id : req.params.id} }
  )
    .then(() => res.status(200).json({ message: "Message modifié !" }))
    .catch((error) => res.status(400).json({ error }));
})}







