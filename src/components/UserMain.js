import React, {Component, PropTypes} from 'react';
import { Route, Switch } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserMoodsDay from './UserMoodsDay';
import UserMoodSelector from './UserMoodSelector';
import UserCommentView from './UserCommentView';
import UserWeekView from './UserWeekView';
import UserMonthView from './UserMonthView';
import fetcher from '../helpers/fetcher';
import { currentDateToString } from '../helpers/formatDate';

export default class UserMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            date: '',
            chosenBlock: {},
            
            savedMoods: [],
            blocks: [],
            allMoods: [],
            src: '/assets/gray.svg',            
        };
        this.handleDateSubmit = this.handleDateSubmit.bind(this);
        this.doFetchDate = this.doFetchDate.bind(this);
        this.handleBlockSelect = this.handleBlockSelect.bind(this);
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    //TODO promise all
    componentDidMount() {
        const token = localStorage.getItem('token'); 
        let date= currentDateToString();

        fetcher({ 
            path: '/user', 
            method: 'GET', 
            token: token 
        })
        .then(res => {
            return res.json();
        })
        .then(user => {
            fetcher({
                path: '/block', 
                method: 'GET', 
            })
            .then(res => {
                return res.json();
            })
            .then(blocks => {
                this.setState({
                    blocks,
                    allMoods: blocks,
                    date,
                    user
                });
               
            })
            .then (() => {
                this.doFetchDate();
            });
        })
        .catch()
    }

    handleBlockSelect(chosenBlock) {
        this.setState({
            ...this.state,
            chosenBlock
        })
    }

    handleDateSubmit(date) {
        this.setState({
            date
        })
        this.doFetchDate()
    }

    doFetchDate() {
        const token = localStorage.getItem('token');
        fetcher({
            path: `/user/moods?date=${this.state.date}`, 
            method: 'GET', 
            token
        })
        .then(res => {
            return res.json();
        })
        .then(moods => {
            const allMoods = [...this.state.blocks];

            console.log('moods in forEach', moods)

            moods.forEach((mood) => {
                allMoods[mood.block.blockNumber] = mood;
            })

            this.setState({
                savedMoods: moods,
                allMoods,
            });
        })
        .catch(err => 
            console.log(err)
        );
    }

    render() {
        const { match } = this.props;
        const user = this.state.user;
        return (
            <div>
                <UserHeader user={ user } />
                <Switch>
                    < Route exact path={`${match.url}`} render={props => (
                        <UserMoodsDay {...props} 
                            user={ user } 
                            blocks={this.state.blocks}
                            allMoods={this.state.allMoods}
                            date={this.state.date}
                            src={this.state.src}
                            savedMoods={this.state.savedMoods}
                            handleDateSubmit={this.handleDateSubmit}
                            doFetchDate={this.doFetchDate}
                            handleBlockSelect={this.handleBlockSelect}
                        />
                    )} />
                    < Route path={`${match.url}/moods`} render={props => (
                        <UserMoodSelector {...props} 
                            date={this.state.date}
                            chosenBlock={this.state.chosenBlock}
                            doFetchDate={this.doFetchDate}
                        />)} 
                    />
                    < Route path={`${match.url}/comments`} render={props => (
                        <UserCommentView {...props} 
                            allMoods={this.state.allMoods}
                            date={this.state.date}
                            src={this.state.src}
                        />
                    )} />
                    < Route path={`${match.url}/week`} component={ UserWeekView }/>
                    < Route path={`${match.url}/month`} component={ UserMonthView }/>
                </Switch>
            </div>
        );
    }
}
                // <span>Today's weather: </span>
                // <span>Location: </span>