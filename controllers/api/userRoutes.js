const router = require('express').Router();
const User = require('../../models/user');

//Runs when user logs in with existing account
router.post('/login', async (req, res) => {
  try {
        //Find if the returning user exists
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        //If user does not exist return error and message
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        
        //Helper function to check if password mathches hashed password
        const validPassword = await userData.checkPassword(req.body.password);
    
        //If passowrd is invalid return error and message
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        
        //If username and password are valid, Then logged_in is added to session as true.
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          req.session.key = userData.jsearchKey;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
});

//Runs when user logs out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

//Creates new user
router.post('/signup', async (req, res) => {
  try{
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      jsearchKey: req.body.apikey,
    });
    res.status(200).json({ newUser ,message: 'Account creation successful' });
  }catch (err){
    console.log(err)
    res.json(err)
  }
  
})
module.exports = router;
