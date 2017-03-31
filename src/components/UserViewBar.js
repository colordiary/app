import React from 'react';
import { Link } from 'react-router-dom';

export default function UserViewBar({ match }) {
    return (
        <div>
            <div>
                <button className='four columns offset-by-four'><Link to={`user/comments`}>Comment View</Link></button>
                <button className='four columns offset-by-four'><Link to={`user/month`}>Month View</Link></button>
            </div>
        </div>
    );
}
