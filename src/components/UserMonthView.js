import React, {  Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../helpers/fetcher';
import UserMonthChart from './UserMonthChart';
import { currentDateToString, formatMonth } from '../helpers/formatDate';

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
        .then(moods => {
            this.setState({
                monthMoods: moods,
                monthColors: moods.map(mood => mood.color)
            });
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
        const formattedDate = formatMonth(this.state.date);
        return (
            <div className='container'>
                <h5 className='text-center'>{formattedDate}</h5>
                <UserMonthChart 
                    date={this.state.date} 
                    monthMoods={this.state.monthMoods} 
                    monthColors={this.state.monthColors}
                    />
                <div className='four columns offset-by-four'>
                    <form onChange={(e) => {
                            e.preventDefault();
                            this.handleDateSubmit(this.refs.searchDate.value);
                        }}>
                        <span>Select another month:</span>
                        <input type='date'ref='searchDate'/>
                    </form>
                </div>
                <button className='four columns offset-by-four'><Link to='/user'>Back</Link></button>
            </div>
        );
    }
}