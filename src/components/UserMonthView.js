import React, {  Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../helpers/fetcher';
import UserMonthChart from './UserMonthChart';

export default class UserMonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '2017-03-30',
            monthMoods: [],
            monthColors: [],
        };
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        let monthColors;
        fetcher({
            path: `/user/moods/month?month=${this.state.date}`,
            method: 'GET',
            token
        })
        .then(res => res.json())
        .then(moods => {
            monthColors = moods.map(mood => {
                return mood.color;
            })
            return moods;
        })
        .then(moods => {
            this.setState({
                monthMoods: moods,
                monthColors 
            })
        })
        .catch(err => {
            console.log('userMonth', err)
        })

    }

    render() {
        return (
            <div>
                <UserMonthChart 
                    date={this.state.date} 
                    monthMoods={this.state.monthMoods} 
                    monthColors={this.state.monthColors}
                    />
                <button><Link to='/user'>Back</Link></button>
            </div>
        );
    }
}