import React, { Component } from 'react';
import fetcher from '../helpers/fetcher';
import { currentDateToString } from '../helpers/formatDate';

export default class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            moods: [],
        };
    }

    componentDidMount() {
        let date = currentDateToString();
        //?date=${date}
        fetcher({
            path:  `/users/moods`, 
            method: 'GET', 
        })
        .then(res => {
            return res.json();
        })
        .then(moods => {
            this.setState({
                moods,
                date
            });
        });
    }

    render() {
        const allUsersMoods = this.state.moods;
        console.log('aum',allUsersMoods);
        return (
            <div className='container'>
                <div>
                    <input type='date' />
                    <select >
                        <option>city</option>
                    </select>
                    <select >
                        <option>state</option>
                    </select>     
                    <select >
                        <option>temperature</option>
                    </select>                 
                    <select >
                        <option>weather</option>
                    </select>  
                </div>
                <div className='ten columns'>
                {allUsersMoods.map(mood => {
                    if(mood.color) {
                        return (
                            <div className='one column'>
                                <img src={mood.color.path} key={mood._id} alt={mood.color}/>
                            </div>
                        );
                    }
                    return;
                })

                }
                </div>
            </div>
        );
    }
}