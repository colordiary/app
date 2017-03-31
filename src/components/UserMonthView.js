import React, {  Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../helpers/fetcher';
import UserMonthChart from './UserMonthChart';
import { currentDateToString } from '../helpers/formatDate';

export default class UserMonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            monthMoods: [],
            monthColors: [],
        };
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.doFetchMonth = this.doFetchMonth.bind(this);
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    
    componentDidMount() {
        let date= currentDateToString();
        this.setState({
            date
        }, () => {
            this.doFetchMonth(this.state.date);
        })
    }

    doFetchMonth() {
        let monthColors;
        const token = localStorage.getItem('token');
        return fetcher({
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

    handleDateSubmit(date) {
        this.setState({
            date
        }, () => {
            this.doFetchMonth()

        })
    }

    render() {
        return (
            <div>
                <form onChange={(e) => {
                        e.preventDefault();
                        this.handleDateSubmit(this.refs.searchDate.value);
                    }}>
                    <label>Choose another month:</label>
                    <input type='date'ref='searchDate'/>
                </form>
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