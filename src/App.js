import React from 'react';

import CSVReader from 'react-csv-reader';

import Dashboard from './Dashboard.js'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: null,
        };
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
        if (this.state.routes) {
            return (
                <Dashboard
                    routes={this.state.routes}
                />
            );
        }
        const parserOptions = {header: true};
        return (
            <CSVReader
                parserOptions={parserOptions}
                onFileLoaded={data => this.loadData(data)}
            />
        );
    }
}

export default App;
