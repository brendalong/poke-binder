import React from 'react';

//Functional components just receive props (which we destructured with ES6) as arguments and return JSX to be rendered.

function Header(props){
    return (
        <header>
            <h1>Poke Binder</h1>
            <p>Login</p>
        </header>
    );
}

export default Header;