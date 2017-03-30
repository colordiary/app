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
    return fetch( `/api${path}`, data);
}

//for the backend: /api/moods (path='/moods')