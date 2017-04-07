import React from 'react';

const Color = (src, alt) => (
    <div className="three columns">
        <img src={`/assets/${src}.svg`} alt={alt}/>
    </div>
);

export default function AllColor() {
    return (
        <div className='container'>
            <div className='row'>
                <Color src='blue1' alt='sad, dark blue'/>
                <Color src='green1' alt='relaxed, dark green'/>
                <Color src='yellow1' alt='happy, dark yellow'/>
            { /* etc */}
            </div>
            <div className='row'>
                <div className="three columns">
                    <img
                        src='/assets/blue2.svg'
                        alt='stressed, medium blue'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/green2.svg'
                        alt='tired, medium green'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/yellow2.svg'
                        alt='excited, medium yellow'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/red2.svg'
                        alt='fearful, medium red'
                        />
                </div>
            </div>
            <div className='row'>
                <div className="three columns">
                    <img
                        src='/assets/blue3.svg'
                        alt='frustrated, light blue'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/green3.svg'
                        alt='bored, light green'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/yellow3.svg'
                        alt='content, light yellow'
                        />
                </div>
                <div className="three columns">
                    <img
                        src='/assets/red3.svg'
                        alt='anxious, light red'
                        />
                </div>
            </div>
        </div>
    );
}
