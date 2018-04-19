import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavLink,
    NavItem } from 'reactstrap';


// function RegionsNav(props){
//     //currently not using!!
//     let cr = props.currentRegion;

//     return (
//     <Navbar color="light" light>
//         <NavbarBrand href="/">Choose Region</NavbarBrand>
//         <Nav tabs>
//             <NavLink onClick={props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
//             <NavLink onClick={props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
//             <NavLink onClick={props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
//             <NavLink onClick={props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
//             <NavLink onClick={props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
//             <NavLink onClick={props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
//             <NavLink onClick={props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
//         </Nav>
//     </Navbar>
//     )
// }


class Navigation extends Component {
    constructor(props){
        super(props);

    }



    render () {
        let cv = this.props.currentView;
        let cr = this.props.currentRegion;
        return (
            <div>
            <Navbar >
                <h1 className="brand">Poke Binder</h1>
                <Nav>
                    <NavItem>
                    <NavLink onClick={this.props.changeView} id="regions" disabled={cv==="regions"} >Regions</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink onClick={this.props.changeView} id="a-z" disabled={cv==="a-z"}>A-Z</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink onClick={this.props.changeView} id="mine" disabled>Mine</NavLink>
                    </NavItem>

                </Nav>
                {/* show the regions when needed */}
                </Navbar>

                  {cv==="regions" ? <ul className="nav justify-content-end subnav">
                  <li className="nav-item " >
                  <NavLink className="nav-link" onClick={this.props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink onClick={this.props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
                  </li>
               </ul> : <ul className="nav justify-content-end subnav"><li><NavLink className="nav-link">.</NavLink> </li></ul>}
            </div>
        );
    }
}

export default Navigation;