
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 4000 


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/");

const Users = mongoose.model('Users', { username: String, password:String });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
 
app.post('/signup', (req, res) =>{
  const username = req.body.username; 
  const password = req.body.password;
  console.log(req);
  const user = new Users({ username: username, password:password});
  user.save()
  .then(() => {
    res.send({message : 'saved successfully.'})
  })
  .catch(() => {
    res.send({message : 'server error'})
  })
})

app.post('/login', (req, res) =>{
  const username = req.body.username; 
  const password = req.body.password;

  Users.findOne({username : username})
    .then((result)=>{
      if(!result){
        res.send({message:"user not found"});
      }
      else {
        if(result.password == password){
          const token = jwt.sign({
            data: result
            }, 'MYKEY', { expiresIn: '1h' });
          res.send({message:"login success", token:token});
        }
        else{
          res.send({message:"incorrect password"});
        }
      }
    })
    .catch((err) =>{
      res.send({message:"backend err"});
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})