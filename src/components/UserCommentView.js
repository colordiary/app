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
                <div className="row">
                    <div className='eight columns offset-by-two'>
                        <div className='row'>
                            <span ><a>Location:</a> {weatherMood.weather.city}, {weatherMood.weather.state}, {weatherMood.weather.country}</span>
                            <br></br>
                            <span ><a>Today's Weather:</a> {weatherMood.weather.temp}, {weatherMood.weather.description}</span>
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <div className='eight columns offset-by-two'>
                    <div className='row'>
                        <div className='two columns'>
                            <p style={{marginTop: 15}}><strong>MOOD:</strong></p>
                        </div>
                        <div className='three columns offset-by-one'>
                            <p style={{marginTop: 15}}><strong>TIME FRAME:</strong></p>
                        </div>
                        <div className='five columns offset-by-one'>
                            <p style={{marginTop: 15}}><strong>COMMENT:</strong></p>
                        </div>
                    </div>
                    {dayBlocks.map((mood, i) => {
                        if(mood.userId) {
                            return (
                    
                                    <div className='row' key={i}>
                                        <div className='two columns'>
                                            <img src={mood.color.path} alt={mood.color.mood}/>
                                        </div>
                                        <div className='three columns offset-by-one'>
                                            <span className='text-center'>{mood.block.timeFrame}</span>
                                        </div>
                                        <div className='five columns offset-by-one'>
                                            <span >{mood.comment}</span>
                                        </div>
                                    </div>
                                
                            );
                        } else {
                            return (
                            
                                    <div className='row' key={i}>
                                        <div className='two columns'>
                                            <img src={props.src} alt='default' />
                                        </div>
                                        <div className='three columns offset-by-one'>
                                            <span className='text-center'>{mood.timeFrame}</span>
                                        </div>
                                        <div className='five columns offset-by-one'>
                                            <span style={{color: 'lightGray'}}>no mood logged</span>
                                        </div>
                                    </div>
                            
                            );  
                        }
                    })}
                    <button><Link to='/user'>Back</Link></button>
                </div>
            </div>
        </div>
    );
}