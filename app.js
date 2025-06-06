const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let tasks = [];
let taskId = 1;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// READ - Show all tasks
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// CREATE - Add new task
app.post('/add', (req, res) => {
  const { title, description, priority } = req.body;
  tasks.push({
    id: taskId++,
    title,
    description,
    priority,
    completed: false
  });
  res.redirect('/');
});


// DELETE - Remove task
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.redirect('/');
});

// SHOW EDIT FORM
app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.render('edit', { task });
  } else {
    res.redirect('/');
  }
});

app.post('/toggle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  res.redirect('/');
});


// UPDATE - Edit task
app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, priority } = req.body;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, title, description, priority } : task
  );

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`TODO app running on http://localhost:${port}`);
});
