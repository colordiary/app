import React from 'react';
import RC2 from 'react-chartjs2';

export default function UserMonthChart(props) {
    // There's a lot of repetative work happening here.
    // You need to figure out what the right data structures
    // are that are needed.
    const moodColors = getColors(props.monthColors);
    const pieColor = Object.keys(moodColors);
    const moodCount = getCount(moodColors);
    const moodLabels = getMoods(moodColors);

    const data = {
        labels: moodLabels,
        datasets: [{
            data: moodCount,
            backgroundColor: pieColor
        }]
    };


    function count(monthColors) {
        // this is a .reduce, reduce the array down to a single result (accumulator)
        const colorCount = {};
        monthColors.forEach((monthColor) => {
            let indexColor = monthColor.color.hexColor;
            if (colorCount[indexColor]) colorCount[indexColor] = colorCount[indexColor] + 1;
            else colorCount[indexColor] = 1;
        });
        return colorCount;
    }

    function values(monthColorsCount) {
        // this is a map, go through the fist array and return a corresponding value
        const colorValues = [];
        Object.keys(monthColorsCount).forEach((key) => {
            colorValues.push(monthColorsCount[key]);
        });
        return colorValues;
    }

    // isn't this the same as "function count" above???
    function getColors(monthColors) {
        const colorCount = {};
        monthColors.forEach((monthColor) => {
            let indexColor = monthColor.hexColor;
            if (colorCount[indexColor]) {
                colorCount[indexColor].count = colorCount[indexColor].count + 1;

            } else {
                colorCount[indexColor] = {
                    count: 1,
                    mood: monthColor.mood
                };
            }
        });
        return colorCount;
    }

    function getCount(colors) {
        return Object.keys(colors).map((colorKey) => {
            return colors[colorKey].count;
        });
    }

    function getMoods(colors) {
        return Object.keys(colors).map((colorKey) => {
            return colors[colorKey].mood;
        });
    }

    return (
        <div className='container' style={{marginBottom: 30}}>
            <div className='row'>
                <div className='six columns offset-by-three'>
                    <RC2 data={data} type='pie' />
                </div>
            </div>
        </div>
    );
}