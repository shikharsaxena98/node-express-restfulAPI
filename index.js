const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

//courses data for testing
const courses = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Electronics and Communication' }
]
//routes

//home page
app.get('/', (req, res) => {
    res.send('hello world!!'); // res and req has various methods which you can see by going to express's website.
});
//courses page
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//adding a course to courses
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//course page
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID does not exist.');
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID does not exist.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID does not exist.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});
//PORT
// process is a global object which helps to access environment variables, port is an environment variable.

const port = 3000
app.listen(port, () => console.log(`listening to port ${port}`));

function validateCourse(course) {
    const schema =
    {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}