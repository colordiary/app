export default function fetcher({ path, method, body, token }) {
    const data = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method,
    };
    
    if( token ) {
        data.headers['Authorization'] = token;
    }
    if(body) {
        data.body = JSON.stringify(body);
    } 
    return fetch( `/api${path}`, data)
        // if you add this, you don't have to do it from every caller:
        .then(res => res.json());
}

//for the backend: /api/moods (path='/moods')