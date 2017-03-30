import React from 'react';
import RC2 from 'react-chartjs2';

export default function UserMonthChart(props) {
    const moodColors = getColors(props.monthColors)
    const pieColor = Object.keys(moodColors)
    const moodCount = getCount(moodColors)
    const moodLabels = getMoods(moodColors)

    const data = {
        labels: moodLabels,
        datasets: [{
            data: moodCount,
            backgroundColor: pieColor
        }]
    };


    function count(monthColors) {
        const colorCount = {};
        monthColors.forEach((monthColor) => {
            let indexColor = monthColor.color.hexColor;
            if (colorCount[indexColor]) colorCount[indexColor] = colorCount[indexColor] + 1;
            else colorCount[indexColor] = 1;
        });
        return colorCount;
    }

    function values(monthColorsCount) {
        const colorValues = [];
        Object.keys(monthColorsCount).forEach((key) => {
            colorValues.push(monthColorsCount[key])
        });
        return colorValues;
    }

    function getColors(monthColors) {
        const colorCount = {}
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
        })
        return colorCount;
    }

    function getCount(colors) {
        console.log('getcount colors');
        return Object.keys(colors).map((colorKey) => {
            return colors[colorKey].count
        })
    }

    function getMoods(colors) {
        console.log('getmoods colors');
        return Object.keys(colors).map((colorKey) => {
            return colors[colorKey].mood
        })
    }

    return (
        <div className='container'>
            <div className='10 columns' style={{ backgroundColor: '#E6E6E6', height: 500 }}>
                <div>
                    <RC2 data={data} type='pie' />
                </div>
            </div>
        </div>
    );
}