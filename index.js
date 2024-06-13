import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"))

var nextID=0;
var blogs=[]


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  
  res.render("index.ejs")
  
});

app.post("/submit", (req, res) => {
  let blog={index:nextID,text:req.body.blog}
  blogs.push(blog);
  nextID++
 
  res.render("index.ejs",{blogs:blogs})
});

app.get("/blogs", (req, res) => {
 
  res.render("blogs.ejs",{blogs:blogs})
  
});

app.post("/blogs", (req, res) => {
 

  if (req.body.edit=="edit") {
    let _blog = blogs[req.body.index]    
    res.render("blog.ejs",{blog:_blog})
  }
  ////////////////////////////////////////////////////////////
  else if(req.body.edit_submit=="edit_submit"){
    console.log(req.body)
    blogs[req.body.blogID].text=req.body.text;    

    res.render("blogs.ejs",{blogs:blogs})
  }
  ////////////////////////////////////////////////////////////
  else if(req.body.delete=="delete"){
    blogs.splice( req.body.index,1)
    for (let i = req.body.index; i < blogs.length; i++) {
      blogs[i].index--;
    }
    nextID=blogs.length
    console.log("helo deleted"+req.body.index)
    res.render("blogs.ejs",{blogs:blogs})
  }
  else{
    console.log(req.body)
    res.render("blogs.ejs")
  }




  
});


app.post("/edit", (req, res) => {

  let id = req.body.index

  res.render("blogs.ejs",{blogs:blogs})
  
});

app.post("/delete", (req, res) => {


  let _blog = blogs[req.body.index]
  res.render("blogs.ejs",{blog:_blog})
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


