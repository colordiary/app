import React, { Component } from 'react';
import fetcher from '../helpers/fetcher';
import { currentDateToString } from '../helpers/formatDate';

export default class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            moods: [],
            weatherDescription: [],
            cities: [],
            states: [],
            temps: [],
        };
        this.doAllMoodsFetch = this.doAllMoodsFetch.bind(this);
        this.doFilterFetch = this.doFilterFetch.bind(this);
        this.populateFilter = this.populateFilter.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onAllMoods = this.onAllMoods.bind(this);
    }

    componentDidMount() {
        let date = currentDateToString();
        let moods;
        let weatherDescription;
        let cities;
        let states;
        let temps;
        Promise.all([
            this.doFilterFetch('weather.description'),
            this.doFilterFetch('weather.city'),
            this.doFilterFetch('weather.state'),
            this.doFilterFetch('weather.temp'),
            this.doAllMoodsFetch()
        ])
        .then(filterValues => {
            weatherDescription = filterValues[0];
            cities = filterValues[1];
            states = filterValues[2];
            temps = filterValues[4];
            moods = filterValues[5];

            return cities;
        })
        .then(fullCities => {
            cities = fullCities.map(city => {
                return city.split(',')[0];
            });
        })
        .then(() => {
            this.setState({
                date,
                moods,
                weatherDescription,
                cities,
                states,
                temps,
            });
        });
    }

    doAllMoodsFetch() {
        return fetcher({
            path:  '/users/moods', 
            method: 'GET', 
        })
        .then(res => {
            return res.json();
        })
        .then(moods => {
            return moods;
        });
    }

    onAllMoods() {
        this.doAllMoodsFetch()
            .then(moods => {
                this.setState({
                    moods
                });
            });
    }

    doFilterFetch(type) {
        return fetcher({
            path: `/users/moods/types?type=${type}`, 
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }

    populateFilter(chooseDefault, type, stateFilter) {
        return (
            <select className='four columns offset-one' onChange={(e) => {
                e.preventDefault();
                const clicked = e.target.value;
                this.onFilterChange(type, clicked);
            }}>
                <option>{chooseDefault}</option>
                {stateFilter.map((option, i) =>{
                    return (
                        <option key={i} ref={type} value={option}>
                            {option}
                        </option>
                    );
                })

                }         
            </select>
        );
    }

    onFilterChange(path, value) {
        fetcher({
            path: `/users/moods/${path}?${path}=${value}`,
            method: 'GET',
        })
        .then(res => res.json())
        .then(moods => {
            this.setState({
                moods
            });
        })
        .catch();
    }

    onDateChange(date) {
        return fetcher({
            path: `/users/moods/date?date=${date}`,
            method: 'GET',
        })
            .then(res => res.json())
            .then(moods => {
                this.setState({
                    moods,
                });
            });
    }

    render() {
        const allUsersMoods = this.state.moods;
        return (
            <div className='container'>
                <div className='six columns offset-by-three'>
                    <img src='/assets/faces.svg'/>
                </div>
                <div >
                    <div className='eight columns offset-by-two'>
                        {this.populateFilter('Filter by weather:', 'description', this.state.weatherDescription)}
                        {this.populateFilter('Filter by city:', 'city', this.state.cities)}
                        {this.populateFilter('Filter by state:', 'state', this.state.states)}
                    </div>
                    <div className='eight columns offset-by-two'>
                        <span className='margin-label'>Filter by date:</span>
                        <input type='date' ref='date' onChange={(e) => {
                            // because you have e, I think you can just use e.target.value
                            const date = this.refs.date.value;
                            e.preventDefault();
                            this.onDateChange(date);
                        }}/>
                        <button className='button-primary float-right' onClick={(e) => {
                            e.preventDefault(); // is this needed?
                            this.onAllMoods();
                        }}>All Moods</button>
                    </div>
                </div>
                <div className='eight columns offset-by-two testing'>
                {allUsersMoods.map(mood => {
                    if(mood.color) {
                        return (
                            <div className='one column' key={mood._id} alt={mood.color.mood}>
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