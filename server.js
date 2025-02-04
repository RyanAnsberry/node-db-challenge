const express = require('express');

const db = require('./data/db-config.js');

const server = express();

server.use(express.json());

// Get all projects
server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
      projects.forEach(project => {
        if (project.completed) {
          project.completed = true
        } else {
          project.completed = false
        }
      })
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})


// Get a project by its id
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db('projects').where({ id }).first()
    .then(project => {
        if (project) {
            if (project.completed) {
              project.completed = true
            } else {
              project.completed = false
            }
          res.json(project);
        } else {
          res.status(404).json({ message: 'Could not find project with given id.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get project' });
      });
})

// Get a projects tasks
server.get('/api/projects/:id/tasks', (req, res) => {
    const  project_id  = req.params.id;

    db('projects')
    .join('tasks', 'tasks.project_id', '=', 'projects.id')
    .select( 'tasks.id', 'tasks.description', 'tasks.notes', 'tasks.completed' )
    .where({ project_id })
    .then(tasks => {
        if (tasks.length) {
          tasks.forEach(task => {
            if (task.completed) {
              task.completed = true
            } else {
              task.completed = false
            }
          })
          res.json(tasks);
        } else {
          res.status(404).json({ message: 'Could not find tasks for given project.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks' });
      });
})

// get a projects related resources
server.get('/api/projects/:id/resources', (req, res) => {
    const  project_id  = req.params.id;

    db('projects')
    .join('resources', 'resources.project_id', '=', 'projects.id')
    .select( 'resources.id', 'resources.name', 'resources.description' )
    .where({ project_id })
    .then(resources => {
        if (resources.length) {
          res.json(resources);
        } else {
          res.status(404).json({ message: 'Could not find resources for given project.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get resources' });
      });
})

// Create a new project
server.post('/api/projects', (req, res) => {
    const projectData = req.body;

    db('projects').insert(projectData)
    .then(project_id => {
        res.status(201).json('Created project id: ' + project_id);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new project' });
      });
})

// Create a new project task
server.post('/api/projects/:id/tasks', (req, res) => {
    const project_id  = req.params.id;
    const taskData = req.body;

    db('tasks').insert({...taskData, project_id})
    .then(taskId => {
        res.status(201).json('Created task with id: ' + taskId);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new task' });
      });
})

// Create a new project resource
server.post('/api/projects/:id/resources', (req, res) => {
  const project_id  = req.params.id;
  const resourceData = req.body;

  db('resources').insert({...resourceData, project_id})
  .then(resourceId => {
      res.status(201).json('Created resource with id: ' + resourceId);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    });
})

module.exports = server;