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

let alphabetArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class Navigation extends Component {

// { String.fromCharCode(65 + i) }
// <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeLetter}>{String.fromCharCode(65 + i)}</NavLink>

   // const logout = <button onClick={() => this.logout()}>Log Out</button>;
//<NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeLetter} id={{String.fromCharCode(65 + i)}} disabled={cl === { String.fromCharCode(65 + i)}}>{String.fromCharCode(65+i)}</NavLink>

    render () {
      let cv = this.props.currentView;
      let cr = this.props.currentRegion;
      let cl = this.props.currentLetter;
      let arrow = `9661;`
      console.log("cl is", cl);
      const alphabetNav = alphabetArray.map((item, index) => {
         let lowercase = item.toLowerCase();
         return <React.Fragment key={index}>
            <li className="nav-item">
               <NavLink style={navCursor} className="nav-link btn letters" onClick={this.props.changeLetter} id={lowercase} disabled={cl===lowercase}>{item}</NavLink>
               </li>
            </React.Fragment>
      })
       //https://www.w3schools.com/charsets/ref_utf_geometric.asp

      // for (let i = 0; i < 26; i++) {
      //     console.log(String.fromCharCode(65 + i));
      // }

        return (
            <div>
            <Navbar >
                <h1 className="brand">Poke Binder</h1>

                <Nav>

                    <NavItem>
                       <NavLink className="btn" style={navCursor} onClick={this.props.changeView} id="regions" disabled={cv === "regions"} >Regions</NavLink>
                       <p className="pointer">{(cv === "regions") ? String.fromCharCode(parseInt(arrow)) : null}</p>
                    </NavItem>
                    <NavItem>
                       <NavLink className="btn" style={navCursor} onClick={this.props.changeView} id="a-z" disabled={cv==="a-z"}>A-Z</NavLink>
                       <p className="pointer">{(cv === "a-z") ? String.fromCharCode(parseInt(arrow)) : null}</p>
                    </NavItem>
                    <NavItem>
                       {(this.props.auth) ?
                           <React.Fragment>
                           <NavLink className="btn" style={navCursor} onClick={this.props.changeView} id="mine" disabled={cv === "mine"}>Mine</NavLink>
                          <p className="pointer">{(cv === "mine") ? String.fromCharCode(parseInt(arrow)) : null}</p>
                          </React.Fragment>
                          : null }
                    </NavItem>
                    <NavItem>
                    {(this.props.auth) ? <NavLink style={navCursor} onClick={this.props.changeAuth} id="logout">Logout</NavLink>
                                        :<NavLink id="login"><LoginModal buttonLabel="Login" loginWithGoogle={this.props.loginWithGoogle} /></NavLink>}
                    </NavItem>
                </Nav>

                {/* show the regions when needed */}
                </Navbar>

                  {cv==="regions" ?
                  <ul className="nav justify-content-end subnav">

                  <li className="nav-item " >
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Kanto" disabled={cr==="Kanto"} >Kanto</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Johto" disabled={cr==="Johto"} >Johto</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Hoenn" disabled={cr==="Hoenn"} >Hoenn</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Sinnoh" disabled={cr==="Sinnoh"} >Sinnoh</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Unova" disabled={cr==="Unova"}>Unova</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Kalos" disabled={cr==="Kalos"}>Kalos</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink style={navCursor} className="nav-link btn" onClick={this.props.changeRegion} id="Alola" disabled={cr==="Alola"}>Alola</NavLink>
                  </li>
               </ul>
               :null
            }

            {cv === "a-z" ?
               <ul className="nav justify-content-end subnav">

                  {alphabetNav}
               </ul>
            : null
            }

            </div>
        );
    }
}

export default Navigation;