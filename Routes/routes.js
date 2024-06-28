const express=require('express')
const { register, login, editProfile } = require('../Controllers/usercontroll')
const upload = require('../middlewares/multermiddleware')
const { addProject, getHomeProjects, getAllProjects, getUserProjects, editProject, deleteProject } = require('../Controllers/projectControl')
const { jwtmiddleWare } = require('../middlewares/jwtMiddleware')

//create an object for router
const router= new express.Router()

//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

//add project                   //key of file in bodyData
router.post('/user/add-project',jwtmiddleWare,upload.single('coverImg'),addProject)

//get 3 project for home page
router.get('/home-projects',getHomeProjects)

//get all project for home page
router.get('/all-projects',getAllProjects)

//user projects
router.get('/user-projects',jwtmiddleWare,getUserProjects)

//edit project
router.put('/user/edit-project/:_id',jwtmiddleWare,upload.single('coverImg'),editProject)

//delete project
router.delete('/user/delete-project/:_id',jwtmiddleWare,deleteProject)

//edit profile
router.put('/user/edit-profile/:_id',jwtmiddleWare,upload.single('profile'),editProfile)




module.exports=router