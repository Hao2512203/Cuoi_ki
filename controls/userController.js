const User = require('../models/User')

exports.registerUser = async (req,res) => {
    const {username,password,role} = req.body
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser ) return res.status.json({message : 'User already exists'})
        
        const new_user =  new User({ username , password ,role})

        await new_user.save()
        res.render('login')
    } catch (error) {
        res.render('register')
    }
}
exports.loginUser = async (req,res) => {
        const {username,password} = req.body
        try {
            const existingUser = await User.findOne({username})
            if (!existingUser) return res.status(404).json({ message: 'User not found' })
            
            if (password != existingUser.password)return res.status(400).json({ message: 'Invalid credentials' })
            
            req.session.user = existingUser;
            res.redirect('/playlist');
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
}
exports.logout = async (req,res) => {
    req.session.destroy();
    res.redirect('/login')
}
