
import User from "./model/userschema.js"; 

router.get('/', (req, res) => {  
    res.send('Main Page by router')
  })

  app.post('/signup', async (req, res) => {
    try {
      const { name, email, password, cpassword, collegename, year, course } = req.body;
  
      if (!name || !email || !password || !cpassword || !collegename || !year || !course) {
        return res.status(400).json({ error: "Please fill all fields" });
      }
  
      if (password !== cpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router