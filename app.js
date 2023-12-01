const express = require('express')
const app = express()
const port = 3000
const mongoose =require('mongoose');
const GrudShema1 = require("./models/grudsschema")
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


// auto refrich
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
const moment = require('moment/moment');
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});






// get  requs
app.get('/', (req, res) => {
  GrudShema1.find().then((result)=>{
    console.log(result)
res.render("index",{arr:result,moment:moment})
  }).catch((err)=>{
console.log(err)
  })
})
 


  
  app.get("/x/:id", (req, res) => {
    GrudShema1.findById(req.params.id)
      .then((result) => {
        console.log("-----------------------")
        console.log(result)
        res.render("user/edit",{ obj: result});
      })
      .catch((err) => {
        console.log(err);
      });
  });


// conect mongodb
mongoose
  .connect(
    "mongodb+srv://yahyax:ZhkJ9ORt1OUpe762@cluster0.awqwdiy.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) =>{
    console.log(err);
  });

// end


// post request
  app.post('/', (req, res) => {
    GrudShema1.create(req.body).then((result)=>{
 
  res.redirect("/")
  
    }).catch((err)=>{
  console.log(err)
    })
  })
  
  // delet
  app.delete("/x/:id",(req,res)=>{
    GrudShema1.findByIdAndDelete(req.params.id).then((result)=>{
      res.redirect("/")
    }).catch((err)=>{
    console.log(err)
    })
  })   

  // update   
  
  app.put("/x/:id", (req, res) => {
    GrudShema1.updateOne({_id: req.params.id}, req.body)
      .then(() => {
        res.redirect("/");
    });
  }); 
  
  