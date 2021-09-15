// import
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const models = require('../models')
const user = require('../models/user')



// routes
exports.signup= (req, res)=>{
    //parametre requete
    const email = req.body.email;
    const lastname= req.body.lastname;
    const firstname= req.body.firstname;
    const password= req.body.password;

    //check si tout les inputs sont remplis

    if (email == null || lastname == null || firstname == null || password == null){
        return res.status(400).json({ 'error': 'Veuillez remplir tout les champs'})
    }

    // verif regex
    const NAME_REGEX = /^[a-zA-Z]+[a-zA-Z-éè]*$/
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const PASSWORD_REGEX =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/

    if(lastname.length >= 25 || lastname.length <= 3 ){
        return res.status(400).json({ 'error': 'le nom doit avoir minimum 4 lettres et maximum 25 lettres'})
    }else if(!NAME_REGEX.test(lastname) ){
        return res.status(400).json({ 'error': 'Le nom  doit  contenir uniquement des lettres '})
    }

    if (firstname.length >= 25 || firstname.length <= 3){
        return res.status(400).json({ 'error': 'Le prenom doit avoir minimum 4 lettres et maximum 25 lettres'})
    }else if(!NAME_REGEX.test(firstname) ){
        return res.status(400).json({ 'error': 'Le prenom  doit  contenir uniquement des lettres '})
    }

    if(!EMAIL_REGEX.test(email)){
        return res.status(400).json({ 'error': 'Email invalide '})
    }

    if(!PASSWORD_REGEX.test(password)){
        return res.status(400).json({ 'error': ' Le mot de passe doit comporter entre 4 et 8 caractères et doit inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.'})

    }




    // cryptage du mot de passe 
    bcrypt.hash(password, 10)
        .then(hash => {
          const user = models.User.create({
              email: email,
              lastname: lastname,
              firstname:firstname,
              password : hash
          })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
    
          

        }) .catch(error => res.status(500).json({ error }))}




exports.login = (req, res)=>{
const email = req.body.email;
const password = req.body.password;

// check si les inputs sont remplis
if (email == null || password == null ){
    return res.status(400).json({ 'error': 'Veuillez remplir tout les champs'})

}

// regex



models.User.findOne({
   where : {email :email} 
})
.then (user => {
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(password, user.password)
    .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
            'userId': user.id,
            token: jwt.sign(
                {userId: user.id},
                `${process.env.TOKEN}`,
                {expiresIn: '5h'},
            )})

 }).catch(error => res.status(500).json({ error }))

})
.catch(error => res.status(500).json({ error }));
}


//get 

exports.getUserProfile= (req, res)=>{
//recuperation de l'user Id dans le token
  
const token = req.headers.authorization.split (' ')[1]; 
const decodedToken= jwt.verify(token, `${process.env.TOKEN}` );
const userId = decodedToken.userId;


models.User.findOne({
    attributes:[ 'id', 'email', 'lastname', 'firstname'],
    where : { id: userId}

})

.then((user)=>{
    if(user){
        res.status(201).json(user)
    }else{
        res.status(404).json({ 'error': 'utilisateur introuvable'})
    }
})
.catch(error => res.status(500).json({ 'error': 'erreur' }));


}
//put 
exports.updateUserProfile =(req,res)=>{
    const token = req.headers.authorization.split (' ')[1]; 
    const decodedToken= jwt.verify(token, `${process.env.TOKEN}` );
    const userId = decodedToken.userId;
    
    models.User.update({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
    
    },

    
    {where:{ id: userId}})
    .then(user => {res.status(201).json(user)})
    .catch (error => res.status(500).json({error}))



}