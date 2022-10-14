/*
dependencies
*/

const express = require("express");
const admin = require("firebase-admin");
let inspect = require("util").inspect;
let busboy = require("busboy");
let path = require("path")
let os = require("os")
let fs = require("fs")
const { v4: uuidv4 } = require('uuid');
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// const {getStorage} = require('firebase-admin/storage')
/*
config - express
*/

const app = express();
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

// const serviceAccount = require("./serviceAccount.json");
// const busboy = require("busboy");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "gs://quasargram-44245.appspot.com"
// });

// const db = getFirestore();
// const serviceAccount = require('./path/to/serviceAccountKey.json');

// initializeApp({
//   credential: cert(serviceAccount),
//   storageBucket: 'quasargram-44245.appspot.com'
// });

const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./serviceAccount.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'quasargram-44245.appspot.com'
});

const bucket = getStorage().bucket();


// let bucket = getStorage().bucket();
const db = getFirestore();

/*
endpoint - posts
*/

app.get("/", (req, res) => {
  try {
    res.json({
      status: 200,
      msg: "Hello Home",
    });
  } catch (err) {
    res.json({
      status: 200,
      msg: "err",
    });
  }
});

app.post("/createPost", (req, res) => {
  console.log("POST request");
  let fields = {}
  let fileData = {}
  let uuid = uuidv4()
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    // console.log(
    //   `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
    //   filename,
    //   encoding,
    //   mimeType
    // );
    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
      //
      let filepath = path.join(os.tmpdir(), filename)
      file.pipe(fs.createWriteStream(filepath))
      fileData = { filepath, mimeType }
  });

  bb.on("field", (name, val, info, fieldname) => {
    fields[name] = val
  });
  bb.on("close", function() {
    // console.log(fields)

    bucket.upload(
      fileData.filepath,{
        uploadType: 'media',
        metadata: {
          medata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile)
        }
      }
    )

      function createDocument(uploadedFile){
        db.collection('posts').doc(fields.id).set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
        }).then(() => {
          res.send('Post added:' + fields.id)
        })
      }
    console.log("Sent the thing")
    res.send("Done parsing form!");
    console.log("Done parsing form!");
    res.writeHead(303, { Connection: "close", Location: "/" });
    res.end();
  });
  req.pipe(bb);
});

app.get("/posts", (req, res) => {
  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      res.json({
        status: 200,
        results: posts,
      });
    });
});

/*
listen
*/
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    res.json({
      status: 400,
      msg: "Err occurred",
      err: err,
    });
  } else {
    console.log(`sever is running on http://localhost:${port}`);
  }
});
