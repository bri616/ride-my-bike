import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RouteMap from './RouteMap.js';
import Stats from './Stats.js';
import Filters from './Filters.js';
import './App.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredRoutes: [],
        };
        this.filterRoutes = this.filterRoutes.bind(this);
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

    withoutFriendFilter(routes) {
        return routes.filter(route => route.athlete_count <= 1);
    }

    searchFilter(routes, word) {
        return routes.filter(route => {
            if (!!route.name) {
                return route.name.indexOf(word) > 0;
            }
            return false;
        });
    }

    speedRangeFilter(routes, speedRange) {
        return routes.filter(route => (route.average_speed * 0.000621371 * 3600 >= speedRange[0]) && (route.average_speed * 0.000621371 * 3600 < speedRange[1]));
    }

    filterRoutes(filters) {
        let filteredRoutes = this.props.routes;
        if (filters.commutes === true) {
            filteredRoutes = this.commuteFilter(filteredRoutes);
        }
        if (filters.nonCommutes === true) {
            filteredRoutes = this.nonCommuteFilter(filteredRoutes);
        }
        if (filters.withFriends === true) {
            filteredRoutes = this.friendFilter(filteredRoutes);
        }
        if (filters.withoutFriends === true) {
            filteredRoutes = this.withoutFriendFilter(filteredRoutes);
        }
        if (!!filters.searchWord && filters.searchWord !== '') {
            filteredRoutes = this.searchFilter(filteredRoutes, filters.searchWord);
        }
        filteredRoutes = this.speedRangeFilter(filteredRoutes, filters.speedRange);
        this.setState({filteredRoutes: filteredRoutes});
    }

    render() {
        return (
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className="route-map-paper">
                            <RouteMap
                                routes={this.state.filteredRoutes}
                                allRoutes={this.props.routes}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className="stats-paper">
                            <Stats
                                routes={this.state.filteredRoutes}
                                allRoutes={this.props.routes}
                            />
                        </Paper>
                        <Paper className="filters-paper">
                            <Filters
                                filterRoutes={this.filterRoutes}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Dashboard;
