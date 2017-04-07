import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import UserViewBar from './UserViewBar';
import { formatDate } from '../helpers/formatDate';

export default class UserMoodsDay extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    // this method is a bit of a mess. It needs to be broken into some 
    // chunks to make it easier to understand.
    render() {
        const formattedDate = formatDate(this.props.date);
        if(!this.props.allMoods && !this.props.date) {
            return <div style={{color: '#E6E6E6', textAlign: 'center'}}>LOADING</div>
        }
        const { match } = this.props;
        let rowOne = [];
        let rowTwo = [];
        let rowThree = [];
        let count = 0;
        this.props.allMoods.forEach((block, i) => {
            if(i < 3) {
                rowOne.push(block);
            } else if ( i >=3 && i < 6 ) {
                rowTwo.push(block);
            } else if ( i > 8) {
                return;
            } else {
                rowThree.push(block);
            }
        });
        let allRows = [];
        allRows.push(rowOne, rowTwo, rowThree);
        let weatherMood;
        if (this.props.savedMoods) {
            weatherMood = this.props.savedMoods[0];
        }
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
                <div className='eight columns offset-by-two'>
                {allRows.map((row, x) => {
                    return (<div className='row' key={x}>
                        {row.map((block, i) => {
                            count += 1;
                            return (
                                <div className="four columns" key={block._id}>
                                    <Link to={`${match.url}/moods`}>
                                        {block.timeFrame &&
                                            (<div style={{textAlign:'center', marginBottom: 15}}>
                                                <input style={{marginBottom: 0, display: 'block'}}
                                                    onClick={(e) => {
                                                        this.props.handleBlockSelect(block);
                                                    }}
                                                    type='image'
                                                    key={i}
                                                    ref={block.blockNumber}
                                                    src={this.props.src}
                                                    alt={`${block.timeFrame}`}
                                                />
                                                <span>{this.props.blocks[count -1].timeFrame}</span>
                                            </div>)
                                        }
                                        {block.color &&
                                            (<div style={{textAlign:'center', marginBottom: 15}}>
                                                <input style={{marginBottom: 0, display: 'block'}}
                                                    onClick={(e) => {
                                                        this.props.handleBlockSelect(block.block);
                                                    }}
                                                    type='image'
                                                    key={i}
                                                    ref={block.block.blockNumber}
                                                    src={block.color.path}
                                                    alt={`${block.block.timeFrame}`}
                                                />
                                                <span>{this.props.blocks[count - 1].timeFrame}</span>
                                            </div>)
                                        }
                                    </Link>
                                </div>
                            )
                        })}
                    </div>)
                    })
                }
                </div>
                <div className='eight columns offset-by-two'>
                    <form onChange={(e) => {
                            e.preventDefault();
                            this.props.handleDateSubmit(this.refs.searchDate.value);
                        }}>
                        <span className='margin-label'>See moods for another day:</span>
                        <input type='date'ref='searchDate' required/>
                            <span style={{fontSize: 24}}>*</span>
                    </form>
                </div>
                <UserViewBar />
            </div>
        );
    }
}