const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

const userServices = require('./models/user-services');


app.use(cors());
app.use(express.json());


app.get('/workouts', async (req, res) => {
    const name = req.query['name'];
    try {
        const result = await userServices.getWorkouts(name);
        res.send({workouts_list: result});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/stats', async (req, res) => {
    const name = req.query['name'];
    try {
        const result = await userServices.getStats(name);
        res.send({stats_list: result});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});


app.post('/stats/:id', async (req, res) => {
    const id = req.params['id'];
    const newRec = req.body;
    const updatedWorkout = await userServices.updateStats(id, newRec);
    const stats = [updatedWorkout]
    if (updatedWorkout) {
        res.status(201).send({stats_list: stats}).end();
    } else {
        res.status(404).end();
    }
});


app.get('/workouts/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findWorkoutById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        res.send({workouts_list: result});
    };
});


app.post('/workouts', async (req, res) => {
    const workout = req.body;
    const savedWorkout = await userServices.addWorkout(workout);
    if (savedWorkout)
        res.status(201).send(savedWorkout).end();
    else
        res.status(500).end();
});





app.delete('/workouts/:id', async (req, res) => {
    const id = req.params['id'];
    const deletedWorkout = await userServices.deleteUser(id);
    if (deletedWorkout) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 