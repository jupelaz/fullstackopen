interface ExerciseData { periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

interface calculatorValues {
    target: number,
    period: Array<number>
}
const parseArgs = (args: Array<string>): calculatorValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [node,program,...variableArgs] = args;
    console.log(node,program);
    if (variableArgs.some(arg => isNaN(Number(arg)))) throw new Error('Provided values were not numbers!');
    const [target, ...period] = variableArgs;
    return {
        target:+target,
        period:period.map(n=>+n)
    };
};

export const exerciseCalculator = (training:Array<number>,target:number):ExerciseData => {
    const average = training.reduce((prev,curr) => prev+curr,0) / training.length;
    return {
        periodLength: training.length,
        trainingDays: training.filter(day => day > 0).length,
        average: average,
        target: target,
        rating: average > target ? 3 : average > target - 1 ? 2 : 1,
        success: average > 2,
        ratingDescription: average > 2 ? 'Well done' : average > 1 ? 'You could do better' : 'You didnt even tried!'
    };
};


try{
    const { target, period } = parseArgs(process.argv);
    console.log(exerciseCalculator(period, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}