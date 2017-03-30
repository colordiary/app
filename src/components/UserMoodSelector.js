import React, { Component, PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fetcher from '../helpers/fetcher';

export default class UserMoodSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitMoodRedirect: false,
            colors: [],
            selectedColor: {}
        };
        this.handleMoodSubmit = this.handleMoodSubmit.bind(this);
        this.doFetchMoodPost = this.doFetchMoodPost.bind(this);
        this.handleRedirectToUser = this.handleRedirectToUser.bind(this);
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    componentDidMount() {
        fetcher({
            path: '/color', 
            method: 'GET', 
        })
        .then(res => {
            return res.json();
        })
        .then(colors => {
            this.setState({
                ...this.state,
                colors 
            });
        })
        .catch(err => 
            console.log(err)
        );
    }

    handleMoodSubmit(color) {
        this.setState({
            ...this.state,
            selectedColor: color,
        })
    }

    handleRedirectToUser() {
        this.setState({
            submitMoodRedirect: true,
        })
    }

    doFetchMoodPost(blockId, colorId, zipcode, comment, date) {
        const token = localStorage.getItem('token');

        return fetcher({
            path: '/user/moods/add',
            method: 'POST',
            body: {
                blockId,
                colorId,
                zipcode,
                comment,
                date,
            },
            token,
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if(json.error) {
                console.log('error', json.error);
                return;
            }
            this.props.doFetchDate();
        });
    }

    render() {
        if(this.state.submitMoodRedirect) {
            return (< Redirect to='/user' />);
        }
        let colorRowOne = [];
        let colorRowTwo = [];
        let colorRowThree = [];
        this.state.colors.forEach((block, i) => {
            if(i < 4) {
                colorRowOne.push(block);
            } else if ( i >=4 && i < 8 ) {
                colorRowTwo.push(block);
            } else if ( i > 11) {
                return;
            } else {
                colorRowThree.push(block);
            }
        });
        let allColorRows = [];
        allColorRows.push(colorRowOne, colorRowTwo, colorRowThree);

        return (
            <section className='container'>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        const zipcode = this.refs.zipcode.value;
                        const comment = this.refs.comment.value;

                        this.doFetchMoodPost(
                            this.props.chosenBlock._id, 
                            this.state.selectedColor._id, 
                            zipcode, 
                            comment, 
                            this.props.date)
                            .catch(err => {
                                console.log(err);
                            });
                        this.handleRedirectToUser();
                        e.target.reset();
                    }}>
                    <input type='text' ref='zipcode' placeholder='zip code' required/><span style={{fontSize: 24}}>*</span>
                    <br/>
                    <input type='text' ref='comment' placeholder='comment'/>

                    <div style={{textAlign: 'center', marginTop: '20px'}}>What's your {this.props.chosenBlock.timeFrame} mood?</div>
                    <div className='container'>
                    {allColorRows.map((row, i) => {
                        return (<div className='row' key={i}>
                            {row.map((color, i) => {
                                return (
                                    <div className="three columns" key={color._id}>
                                        <input
                                            type='image'
                                            key={color.index}
                                            ref={color.mood} 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.handleMoodSubmit(color);
                                            } }
                                            src={color.path}
                                            alt={color.mood}
                                            />
                                    </div>
                                );
                            })}
                        </div>)
                    })}
                    </div>
                    <button className='button-primary'>Submit Mood</button>
                    <button><Link to='/user'>Back</Link></button>
                </form>
            </section>
        );
    }
}