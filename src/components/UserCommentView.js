import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/formatDate';

export default function UserCommentView(props) {
    const dayBlocks = props.allMoods;
    console.log('dayBlocks',dayBlocks);
    let weatherMood;
    if(dayBlocks) {
        let dayMoods = dayBlocks.filter(block => {
            if(block.color) {
                return block;
            }
        });
        weatherMood = dayMoods[0];
    }
    const formattedDate = formatDate(props.date);
    console.log('comment date', formattedDate);
    return (
        <div className='container'>
            <h5 className='text-center'>{formattedDate}</h5>
            {weatherMood &&
                <div className='row'>
                    <span className='eight columns offset-by-two'><a>Location:</a> {weatherMood.weather.city}, {weatherMood.weather.state}, {weatherMood.weather.country}</span>
                    <br></br>
                    <span className='eight columns offset-by-two'><a>Today's Weather:</a> {weatherMood.weather.temp}, {weatherMood.weather.description}</span>
                </div>
            }  
            <div className='row clearfix'>
                <div className='two columns'>
                    <span><strong>Mood:</strong></span>
                </div>
                <div className='two columns'>
                    <span><strong>Time Frame:</strong></span>
                </div>
                <span><strong>Comment:</strong></span>
            </div>
            {dayBlocks.map((mood, i) => {
                if(mood.userId) {
                    return (
                        <div key={i}>
                            <div className='row'>
                                <div className='two columns'>
                                    <img src={mood.color.path} alt={mood.color.mood}/>
                                </div>
                                <div className='two columns'>
                                    <span className='text-center'>{mood.block.timeFrame}</span>
                                </div>
                                <span>{mood.comment}</span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={i}>
                            <div className='row'>
                                <span></span>
                                <div className='two columns'>
                                    <img src={props.src} alt='default' />
                                </div>
                                <div className='two columns'>
                                    <span className='text-center'>{mood.timeFrame}</span>
                                </div>
                                <span style={{color: 'lightGray'}}>no mood logged</span>
                            </div>
                        </div>
                    );  
                }
            })}
            <button><Link to='/user'>Back</Link></button>
        </div>
    );
}