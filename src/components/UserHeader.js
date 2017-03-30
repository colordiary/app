import React from 'react';

export default function UserHeader(props) {
    return (
        <section className='container title'>
            <div>
                <h3>{props.user.username}</h3>
            </div>
        </section>
    );
}