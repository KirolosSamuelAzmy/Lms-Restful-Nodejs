var express = require('express');
var http = require('http');
var path = require("path");
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

const fs = require('fs');

var app = express();
app.use(express.json());
var server = http.createServer(app);


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

// Home Page get requests
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/home.html'));
  });

app.get('/courses',function(req,res){
    res.sendFile(path.join(__dirname,'/courses.html'));
});
app.get('/students',function(req,res){
    res.sendFile(path.join(__dirname,'/students.html'));
});


//Courses page post and get requests

app.get('/web/courses/create',function(req,res){
    res.sendFile(path.join(__dirname,'/create_courses.html'));
});


app.post('/web/courses/create',function(req, res)
{
    id=Math.floor(Math.random() * 900000) + 100000;
    let course = { 
        name: req.body.name,
        code: req.body.code, 
        desciption: req.body.description,
        id:id
    };
    const courses=require('./courses.json');
    courses.push(course);
    fs.writeFile("courses.json", JSON.stringify(courses), err => {  
        // Checking for errors
        if (err) throw err; 
        console.log("Done writing"); // Success
    });
    res.redirect("http://localhost:3000/api/courses/create/done");
});

app.get('/api/courses/create/done',function(req,res){
    res.sendFile(path.join(__dirname,'/courses_done.html'));
});

// Show all courses information
app.get('/api/courses',function(req,res){
    const data=fs.readFileSync('./courses.json','utf-8');
    const courses_data = JSON.parse(data);
    res.send(courses_data);
});


app.put('/api/courses/:id',function(req,res)
{
    const data=fs.readFileSync('./courses.json','utf-8');
    const courses_data = JSON.parse(data);
    const course = req.body;
    let course_id=courses_data.find(c=>c.id===parseInt(req.params.id));
    if(!course_id) res.status(404).send("The course with given id is not found");
    for (var i = 0; i < courses_data.length; i++) {
        if (courses_data[i].id == req.params.id) {
          courses_data[i].name = course.name;
          courses_data[i].code=course.code;
          if(courses_data[i].description){ courses_data[i].description = course.description;}
          break;
        }
    }
    fs.writeFile("courses.json", JSON.stringify(courses_data), err => {  
        // Checking for errors
        if (err) throw err; 
        res.send("Done updating");
        console.log("Done updating"); // Success
    });
});




app.delete('/api/courses/:id',function(req,res)
{
    const data=fs.readFileSync('./courses.json','utf-8');
    const courses_data = JSON.parse(data);
    const course = req.body;
    let course_id=courses_data.find(c=>c.id===parseInt(req.params.id));
    if(!course_id) res.status(404).send("The course with given id is not found");
    for (var i = 0; i < courses_data.length; i++) {
        if (courses_data[i].id == req.params.id) {
            delete courses_data[i];
        }
          break;
        }
    
    var filtered = courses_data.filter(function (el) {
        return el != null;
    });
  
    fs.writeFile("courses.json", JSON.stringify(filtered), err => {  
        // Checking for errors
        if (err) throw err; 
        res.send("Done deleting");
        console.log("Done deleting"); // Success
    });
});











//////////////////////// Students Part  /////////////////



//Student page post and get requests

app.get('/web/students/create',function(req,res){
    res.sendFile(path.join(__dirname,'/create_students.html'));
});


app.post('/web/students/create',function(req, res)
{
    id=Math.floor(Math.random() * 900000) + 100000;
    let student = { 
        name: req.body.name,
        code: req.body.code, 
        id:id
    };
    const students=require('./students.json');
    students.push(student);
    fs.writeFile("students.json", JSON.stringify(students), err => {  
        // Checking for errors
        if (err) throw err; 
        console.log("Done writing"); // Success
    });
    res.redirect("http://localhost:3000/api/students/create/done");
});

app.get('/api/students/create/done',function(req,res){
    res.sendFile(path.join(__dirname,'/students_done.html'));
});

// Show all students information
app.get('/api/students',function(req,res){
    const data=fs.readFileSync('./students.json','utf-8');
    const students_data = JSON.parse(data);
    res.send(students_data);
});


app.put('/api/students/:id',function(req,res)
{
    const data=fs.readFileSync('./students.json','utf-8');
    const students_data = JSON.parse(data);
    const student = req.body;
    let student_id=students_data.find(c=>c.id===parseInt(req.params.id));
    if(!student_id) res.status(404).send("The student with given id is not found");
    for (var i = 0; i < students_data.length; i++) {
        if (students_data[i].id == req.params.id) {
          students_data[i].name = student.name;
          students_data[i].code=student.code;
          break;
        }
    }
    fs.writeFile("students.json", JSON.stringify(students_data), err => {  
        // Checking for errors
        if (err) throw err; 
        res.send("Done updating");
        console.log("Done updating"); // Success
    });
});




app.delete('/api/students/:id',function(req,res)
{
    const data=fs.readFileSync('./students.json','utf-8');
    const students_data = JSON.parse(data);
    const student = req.body;
    let student_id=students_data.find(c=>c.id===parseInt(req.params.id));
    if(!student_id) res.status(404).send("The course with given id is not found");
    for (var i = 0; i < students_data.length; i++) {
        if (students_data[i].id == req.params.id) {
            delete students_data[i];
        }
          break;
        }
    
    var filtered = students_data.filter(function (el) {
        return el != null;
    });
  
    fs.writeFile("students.json", JSON.stringify(filtered), err => {  
        // Checking for errors
        if (err) throw err; 
        res.send("Done deleting");
        console.log("Done deleting"); // Success
    });
});


server.listen(port,function(){ 
    console.log("Server listening on port: 3000");
});