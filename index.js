const express= require ('express')
const app = express()

//Middleware
app.use(express.json())



const stage = require('./stage.json')
const candidat = require('./candidat.json')
const candidature = require('./candidature.json')

app.listen(82, ()=> {
   console.log('Demande de stage via Express Js')
})

//GET List stages (avec filtre par année)
app.get('./stage', (req,res) => {

    //res.send("Liste des stages")
    res.status(200).json(candidat)

}
)

//POST crée un stage
app.post('./stage', (req,res) => {

    var code = require('shortid');
    code.generate();

    stage.push(req.body)
    res.status(200).json(stage)
})

//POST crée une candidature
app.post('./candidature', (req,res) => {

    candidature.push(req.body)
    res.status(200).json(candidature)
})

 //GET List candidates
 app.get('./candidat', (req,res) => {

   
    res.status(200).json(candidat)
})


//GET List Candidatures
app.get('./candidature', (req,res) => {

    //res.send("Liste des stages")
    res.status(200).json(candidature)
})

//GET List stages postulés par candidate 
app.get('./stage', (req,res) => {

    //res.send("Liste des stages")
    res.status(200).json(candidat)
})

//PATCH Postuler un stage 
app.patch('/api/check/:index', function (req, res) {
    data = require('./stage.json');
    var index = req.params.index;
    data[index].checked = !data[index].checked;
    fs.writeFile( "stage.json", JSON.stringify( data ), "utf8", function() {
      res.send({success: true});
    } );
  });