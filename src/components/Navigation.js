import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavLink,
    NavItem } from 'reactstrap';
import LoginModal from './LoginModal';

//could also add to nav-link style
const navCursor = {
   cursor: "pointer",
};

class Navigation extends Component {
   
    render () {
        let cv = this.props.currentView;
        let cr = this.props.currentRegion;
        return (
            <div>
            <Navbar >
                <h1 className="brand">Poke Binder</h1>
               
                <Nav>
                
                    <NavItem>
                       <NavLink style={navCursor} onClick={this.props.changeView} id="regions" disabled={cv==="regions"} >Regions</NavLink>
                    </NavItem>
                    <NavItem>
                       <NavLink style={navCursor} onClick={this.props.changeView} id="a-z" disabled={cv==="a-z"}>A-Z</NavLink>
                    </NavItem>
                    <NavItem>
                    {(this.props.auth) ? <NavLink style={navCursor} onClick={this.props.changeView} id="mine" disabled>Mine</NavLink> : null }
                    </NavItem>
                    <NavItem>
                    {(this.props.auth) ? <NavLink style={navCursor} onClick={this.props.changeAuth} id="logout">Logout</NavLink>
                                        :<NavLink id="login"><LoginModal buttonLabel="Login" loginWithGoogle={this.props.loginWithGoogle} /> </NavLink>}
                    </NavItem>                 
                </Nav>
               
                {/* show the regions when needed */}
                </Navbar>

                  {cv==="regions" ? <ul className="nav justify-content-end subnav">
                  <li className="nav-item " >
                    <NavLink style={navCursor} className="nav-link" onClick={this.props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} onClick={this.props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
                  </li>
               </ul> :
               null
            }
            </div>
        );
    }
}

export default Navigation;