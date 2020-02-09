import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import RouteMap from './RouteMap.js';
import Stats from './Stats.js';
import Filters from './Filters.js';
import './App.css';


const toMph = function(mps, key) {
    if (key === 'average_speed') {
        return mps * 0.000621371 * 3600;
    }
    return mps;
};


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
                return route.name.indexOf(word) >= 0;
            }
            return false;
        });
    }

    speedRangeFilter(routes, speedRange) {
        return routes.filter(route => (route.average_speed * 0.000621371 * 3600 >= speedRange[0]) && (route.average_speed * 0.000621371 * 3600 < speedRange[1]));
    }

    filterRoutes(filters) {
        const keysWithMinMax = [
            'athlete_count',
            'average_speed',
        ];
        let filteredRoutes = this.props.routes.filter((route) => {
            for (let key in filters) {
                if (route[key] === undefined) {
                    return false;
                }
                else if (keysWithMinMax.includes(key)) {
                    if (filters[key]['min'] !== null && toMph(route[key], key) < filters[key]['min']) {
                        return false;
                    }
                    if (filters[key]['max'] !== null && toMph(route[key], key) > filters[key]['max']) {
                        return false;
                    }
                }
                else if (key === 'name' && filters[key] !== '' && !route[key].includes(filters[key])) {
                    return false;
                }
                else if (key !== 'name' && !keysWithMinMax.includes(key) && !filters[key].includes(route[key])) {
                    return false;
                }
            }
            return true;
        });
        filteredRoutes = filteredRoutes.length === this.props.routes.length ? [] : filteredRoutes;
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
