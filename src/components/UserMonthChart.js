import React from 'react';
import RC2 from 'react-chartjs2';

export default function UserMonthChart(props) {
    const jlColors = getColors(props.monthColors)
    const lkLabels = Object.keys(jlColors)
    const cfCount = getCount(jlColors)
    const cfMood = getMoods(jlColors)
    
    const data = {
        labels: cfMood,
        datasets: [{
            data: cfCount,
            backgroundColor: lkLabels
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

    function values (monthColorsCount) {
        const colorValues = [];
        Object.keys(monthColorsCount).forEach((key) => {
            colorValues.push(monthColorsCount[key])
        });
        return colorValues;
    }

    function getColors (monthColors) {
        const colorCount = {}
        monthColors.forEach((monthColor) => {
            let indexColor = monthColor.color.hexColor
            if (colorCount[indexColor]) {
                colorCount[indexColor].count = colorCount[indexColor].count + 1;
                
            } else {
                colorCount[indexColor] = {
                    count: 1,
                    mood: monthColor.color.mood
                };
            }
        })
        return colorCount;
    }

    function getCount (colors) {
        return Object.keys(colors).map((colorKey) => {
            return colors[colorKey].count
        })
    }

    function getMoods (colors) {
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