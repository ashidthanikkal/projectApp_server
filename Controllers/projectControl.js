const projects = require("../Models/projectmodels")

exports.addProject = async (req, res) => {
    const { title, description, technologies, website, gitHub } = req.body

    const userId = req.payload
    //image access from multer
    const coverImg = req.file?.filename

    const existingProject = await projects.findOne({ gitHub })
    if (existingProject) {
        res.status(400).json(`${existingProject.title} is allready exists..! add new one`)
    }
    else {
        const newProject = new projects({
            title, description, technologies, website, gitHub, userId, coverImg
        })
        newProject.save()
        res.status(201).json(newProject)
    }


}
exports.getHomeProjects = async (req, res) => {

    try {
        const homeProjects = await projects.find().limit(3)
        if (homeProjects) {
            res.status(200).json(homeProjects)
        }
    }

    catch {
        res.status(400).json("get home project")
    }
}

exports.getAllProjects = async (req, res) => {
    //ss querry param form api
    const searchData = req.query.search

    try {
        const allProjects = await projects.find({ technologies: { $regex: searchData, $options: "i" } })//i=case insensitive
        if (allProjects) {
            res.status(200).json(allProjects)
        }
    }

    catch {
        res.status(400).json("get home project")
    }

}

exports.getUserProjects = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await projects.find({ userId })
        if (userProjects) {
            res.status(200).json(userProjects)
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}

exports.editProject = async (req, res) => {
    const { _id } = req.params;
    const { title, description, technologies, coverImg, website, gitHub } = req.body
    const newCoverImg = req.file ? req.file.filename : coverImg
    const userId = req.payload

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id },
            { title, description, technologies, coverImg: newCoverImg, website, gitHub, userId },
            { new: true }
        )
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteProject = async (req, res) => {
    const { _id } = req.params

    try {
        const deletedProject = await projects.findByIdAndDelete({ _id })
        res.status(200).json(deletedProject)
    }
    catch (error) {
        res.status(400).json(error)
    }
}
