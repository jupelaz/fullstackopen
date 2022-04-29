
import express from 'express';
import {calculateBmi} from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.use(express.json())
app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;
    if (!height || !weight) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    }
    
    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const send = {
            height: Number(height),
            weight: Number(weight),
            bmi: calculateBmi(Number(height), Number(weight))
        };
        res.send(send);
    }else{
        res.send({error: 'malformatted parameters'});
    }
});

app.post('/exercises', (req, res) => {
    console.log('req',req)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const input = {daily_exercises: req.body.daily_exercises,
        target: req.body.target};
    if(!input.daily_exercises || !input.target) 
        res.status(400).send({
            error: "parameters missing"
          });
    else if(!input.daily_exercises.isArray && !isNaN(input.target) && input.daily_exercises.some((daily: number) => isNaN(daily))) 
        res.status(400).send({
            error: "malformatted parameters"
          });
    else{
        res.status(200).send(exerciseCalculator(input.daily_exercises, input.target));
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});