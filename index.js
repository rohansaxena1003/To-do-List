import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                        'September', 'October', 'November', 'December'];
const todaysTaskArray = [];
const workListArray = [];                        
const date = new Date();
const todaysHeading = `${daysOfWeek[date.getDay()]}, ${monthsOfYear[date.getMonth()]} ${date.getDate()}`
let currentDate = date.getDate();
if(currentDate != new Date().getDate()) { // empty todaysTaskArray when date changes and update the date
    todaysTaskArray = [];
    currentDate = new Date().getDate();
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render("index.ejs", { 
        heading : todaysHeading,
        today: "today",
        array: todaysTaskArray
    });
});

app.get('/work', (req, res) => {
    res.render("index.ejs", {
        heading: "Work List", 
        work: "work", 
        array: workListArray
    });
});

app.post('/', (req, res) => {
    let task = req.body["name"];
    todaysTaskArray.push(task);
    res.render('index.ejs', {
        heading: todaysHeading, 
        array: todaysTaskArray, 
        today: "today" 
    });
});

app.post('/work', (req, res) => {
    let task = req.body["name"];
    workListArray.push(task);
    res.render('index.ejs', {
        heading: "Work List", 
        array: workListArray, 
        work: "work"
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});