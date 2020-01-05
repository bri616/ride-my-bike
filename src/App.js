import React from 'react';

import firebase, { auth, provider } from './firebase.js';
import Dashboard from './Dashboard.js'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: null,
            user: null,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    routes: null,
                    user: null
                });
            });
    }

    loadData(data) {
        console.log(data);
        const newData = data.map(item => (
            {
                ...item,
                distance: isNaN(Number(item.distance)) ? 0 : Number(item.distance),
                average_speed: isNaN(Number(item.average_speed)) ? 0 : Number(item.average_speed),
                athlete_count: isNaN(Number(item.athlete_count)) ? 0 : Number(item.athlete_count),
            }
        ));
        this.setState(state => ({
            routes: newData,
        }));
    }

    render() {
        if (this.state.user && this.state.routes === null) {
            const itemsRef = firebase.database().ref('rides');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push(items[item]);
                }
                console.log('here');
                this.loadData(newState);
            });
        }

        if (this.state.routes) {
            return (
                <div>
                    <button onClick={this.logout}>Log Out</button>
                    <Dashboard
                        routes={this.state.routes}
                    />
                </div>
            );
        }
        return (
            <div>
                {this.state.user ?
                        <button onClick={this.logout}>Log Out</button>
                        :
                        <button onClick={this.login}>Log In</button>
                }
            </div>
        );
    }
}

export default App;
