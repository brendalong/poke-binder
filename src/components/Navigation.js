import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink } from 'reactstrap';


function RegionsNav(props){
    //currently not using!!
    let cr = props.currentRegion;

    return (
    <Navbar color="light" light>
        <NavbarBrand href="/">Choose Region</NavbarBrand>
        <Nav tabs>
            <NavLink onClick={props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
            <NavLink onClick={props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
            <NavLink onClick={props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
            <NavLink onClick={props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
            <NavLink onClick={props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
            <NavLink onClick={props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
            <NavLink onClick={props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
        </Nav>
    </Navbar>
    )
}


class Navigation extends Component {
    constructor(props){
        super(props);

        // this.navClicked = this.navClicked.bind(this);
        // this.changeRegion = this.props.changeRegion.bind(this);
    }

    // navClicked(event){
    //     console.log("sort by:", event.target.id);
    //     this.setState({
    //         currentView: event.target.id,
    //     });
    // }

    


    render () {
        let cv = this.props.currentView;
        let cr = this.props.currentRegion;
        return (
            <div>
            <Navbar color="light" light>
                <NavbarBrand href="/">Show Me Pokemon</NavbarBrand>
                <Nav tabs>
                    <NavLink onClick={this.props.changeView} id="regions" disabled={cv==="regions"} >Regions</NavLink>
                    <NavLink onClick={this.props.changeView} id="types" disabled={cv==="types"}>Types</NavLink>
                    <NavLink onClick={this.props.changeView} id="a-z" disabled={cv==="a-z"}>A-Z</NavLink>
                    <NavLink onClick={this.props.changeView} id="mine" disabled={cv==="mine"}>Mine</NavLink>
                </Nav>
                {/* show the regions when needed */}
                </Navbar>
                {cv==="regions" ? <Nav tabs>
                <NavLink onClick={this.props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
                <NavLink onClick={this.props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
            </Nav> : null}
            </div>
        );
    }
}

export default Navigation;