import React from 'react';

import Container from '@material-ui/core/Container';
import CSVReader from 'react-csv-reader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RouteMap from './RouteMap.js';
import Stats from './Stats.js';
import Filters from './Filters.js';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: null,
            allRoutes: null,
        };
        this.filterRoutes = this.filterRoutes.bind(this);
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
            allRoutes: newData,
        }));
    }

    commuteFilter(routes) {
        return routes.filter(route => route.commute === 'True');
    }

    nonCommuteFilter(routes) {
        return routes.filter(route => route.commute !== 'True');
    }

    friendFilter(routes) {
        return routes.filter(route => route.athlete_count > 1);
    }

    filterRoutes(filters) {
        let filteredRoutes = this.state.allRoutes;
        if (filters.commutes === true) {
            filteredRoutes = this.commuteFilter(filteredRoutes);
        }
        if (filters.nonCommutes === true) {
            filteredRoutes = this.nonCommuteFilter(filteredRoutes);
        }
        if (filters.withFriends === true) {
            filteredRoutes = this.friendFilter(filteredRoutes);
        }
        this.setState({routes: filteredRoutes});
    }

    render() {
        const parserOptions = {header: true};
        if (this.state.routes) {
            return (
                <Container maxWidth="xl">
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                          <Paper className="route-map-paper">
                              <RouteMap
                                  routes={this.state.routes}
                              />
                          </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Paper className="stats-paper">
                              <Stats
                                  routes={this.state.routes}
                              />
                          </Paper>
                          <Paper className="filters-paper">
                              <Filters
                                  routes={this.state.allRoutes}
                                  filterRoutes={this.filterRoutes}
                              />
                          </Paper>
                      </Grid>
                  </Grid>
                </Container>

            );
        }
        return (
            <CSVReader
                parserOptions={parserOptions}
                onFileLoaded={data => this.loadData(data)}
            />
        );
    }
}

export default App;
