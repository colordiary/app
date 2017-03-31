import React from 'react';
import AllColorsStatic from './AllColorsStatic';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function HomePage(props) {
    return (
        <section className='container'>
            <div>
                <div className='title'>
                    <h3>your mood,</h3>  
                    <h1>                  
                        <a style={{color: '#8181FC'}}>H</a>                     
                        <a style={{color: '#6CB1BC'}}>U</a> 
                        <a style={{color: '#F2B451'}}>E</a>
                        <a style={{ color: '#E55C5C' }}>D</a>
                    </h1>
                </div>
                < AllColorsStatic />
            </div>
            <div className='eight columns offset-by-two'>
                <h5 style={{textAlign: 'center', marginTop: 35}}>Map your daily moods with color.</h5>
                <p style={{textAlign: 'center'}}>This tool allows you to visualize your feelings over time. 
                You can identify your mood patterns by tracking weather, location, day of the week, and personal comments. Also peek at how people are feeling around the country. 
                </p>
            </div>
            <div className='six columns offset-by-three'>
                <img  alt='mood faces' src='/assets/faces.svg' />
            </div>
        </section>
    );
}
