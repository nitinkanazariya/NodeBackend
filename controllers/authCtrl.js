const loginController = (req, res) => {
    const {email,password} = req.body
    const params= req.query
    console.log(email, password,params)
    res.json({
        data:{
           json: req.body,
           params,
            date: new Date(Date.now())
        }
    })
}

const registerController = (req, res) => {
    res.json({
        
        data:{
            name:"Register Account",
            date: new Date(Date.now())
        }
    })
}

const getProfileController = (req, res) => {
    res.json({
        
        data:{
            name:"Profile Account",
            date: new Date(Date.now())
        }
    })
}

module.exports = {loginController,registerController,getProfileController}