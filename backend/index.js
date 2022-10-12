/*
dependencies
*/

const express = require('express')
const admin = require('firebase-admin');

/*
config - express
*/

const app = express()
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
/*
  config - firebase
*/

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/*
endpoint - posts
*/

app.get('/',(req,res) => {
  try{
    res.json({
      status : 200 ,
      msg : 'Hello Home'
    })
  }catch (err){
    res.json({
      status : 200 ,
      msg : 'err'
    })
  }
})

app.get('/createPosts', (req, res) => {
  res.send('createPost')
})

app.get('/posts', (req, res) => {
  let posts = []
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    });
    res.json({
      status : 200,
      results : posts
    })
  })
})


/*
listen
*/
const port = process.env.PORT || 3000 ;

app.listen(port, (err) => {
  if(err){
    res.json({
      status : 400,
      msg : "Err occurred" ,
      err : err
    })
  }else{
    console.log(`sever is running on http://localhost:${port}`)
  }
})
