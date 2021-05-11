const router = require('express').Router();
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '--' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject
    if (['image/jpeg','image/png'].indexOf(file.mimetype) > -1){
        cb(null,true)
    } else {
        cb(null,false)
    }
}

const limits = {
    fileSize: 1024*1024*1
}


// multer options
const upload = multer({
    storage,
    limits,
    fileFilter
});




router.route('/add')
    .post(
        upload.single('postImage'),
        passport.authenticate(
        'jwt',
        {session: false}),
        (req, res) => {

            const newPost = new Post({
                user: {
                    id: req.user.id,
                    username: req.user.username,
                },
                text: req.body.text || null,
                tags: req.body.tags.split(',') || null,
                postImage: req.file? req.file.path : null,
                createdAt: Date.now()
            });


            newPost.save()
                .then(post => res.json(post))
                .catch(err => console.log(err))
        });


router.route('/:postId')
    .put(passport.authenticate(
        'jwt',
        {session: false}),
        (req, res) => {
            const text = req.body.text.trim();


            const edits = {
                $set: {
                    text: text
                }
            };


            Post.updateOne(
                {_id: req.params.postId},
                edits
            )
                .then(success => res.json({message: "Update successful!"}))
                .catch(err => console.log(err))
        });


router.route('/:postId')
    .delete(passport.authenticate(
        'jwt',
        {session: false}),
        (req, res) => {


            Post.deleteOne(
                {_id: req.params.postId}, function (err) {
                    if (err){
                        res.status(404).json({message: "Wrong ID"})
                    }
                    else{
                        res.json({message: "Deleted successful!"})
                    }
                })
        });


router.route('/following')
    .get(passport.authenticate(
        'jwt',
        {session: false}),
        (req, res) => {
            Post.find({
                'user.id': {
                    $in: req.user.following
                }
            })
                .sort({createdAt: -1})
                .then(posts => res.json(posts))
                .catch(err => console.log(err))
        });


router.route('/user/:userId')
    .get((req, res) => {
        Post.find({'user.id': req.params.userId})
            .sort({createdAt: -1})
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    });


router.route('/')
    .get((req, res) => {
        Post.find()
            .sort({createdAt: -1})
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    });




router.route('/xml')
    .get((req, res) => {
        Post.find()
            .then(posts => res.send(
                toXml(posts)
            ))
            .catch(err => console.log(err))
    });
const toXml = (data) => {
    return '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/" soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><soap:Body><m:GetPostsResponse>'+
        data.reduce((result, el) => {
            return result + `
                <m:PostDetails>
                    <m:PostId>${el._id}</m:PostId>
                    <m:PostTitle> ${el.text}</m:PostTitle>
                    <m:PostUser> ${el.user.username} </m:PostUser>
                </m:PostDetails>
`
        }, '')
        +'</m:GetPostsResponse> </soap:Body></soap:Envelope>'
}


module.exports = router;
