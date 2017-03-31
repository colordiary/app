import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/formatDate';

export default function UserCommentView(props) {
    const dayMoods = props.allMoods;
    let weatherMood;
    if(dayMoods) {
        weatherMood = dayMoods[0];
    }
    const formattedDate = formatDate(props.date);
    return (
        <div className='container'>
            <h5 className='text-center'>{formattedDate}</h5>
            {weatherMood &&
                <div className='bottom-offset'>
                    {weatherMood.weather.city && <span className='float-left'>Location: {weatherMood.weather.city}, {weatherMood.weather.state}, {weatherMood.weather.country}</span>}
                    {weatherMood.weather.temp && <span className='float-right'>Today's Weather: {weatherMood.weather.temp}, {weatherMood.weather.description}</span>}
                </div>    
            }
            <div className='row clearfix'>
                <div className='two columns'>
                    <span><strong>Mood:</strong></span>
                </div>
                <div className='two columns'>
                    <strong>Time Frame:</strong>
                </div>
                <span><strong>Comment:</strong></span>
            </div>
            {dayMoods.map((mood, i) => {
                if(mood.userId) {
                    return (
                        <div key={i}>
                            <div className='row'>
                                <div className='two columns'>
                                    <img src={mood.color.path} alt={mood.color.mood}/>
                                </div>
                                <div className='two columns'>
                                    <span>{mood.block.timeFrame}</span>
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