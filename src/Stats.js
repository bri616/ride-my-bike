import React from 'react';
import sumBy from 'lodash/sumBy';
import meanBy from 'lodash/meanBy';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PublicIcon from '@material-ui/icons/Public';
import FastForwardIcon from '@material-ui/icons/FastForward';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Stats = (props) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={5}>
                <h2><center>All Rides</center></h2>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <DirectionsBikeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${props.allRoutes.length}`}
                            secondary="Number of Trips"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${parseInt(sumBy(props.allRoutes, 'distance') * 0.000621371)} miles`}
                            secondary="Total Distance"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FastForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${(meanBy(props.allRoutes, 'average_speed') * 0.000621371 * 3600).toFixed(2)} mph`}
                            secondary="Average Speed"
                        />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={1}>
                <Divider orientation="vertical" />
            </Grid>
            {props.routes.length > 0 && props.allRoutes.length !== props.routes.length &&
            <Grid item xs={5}>
                <h2>Filtered Rides</h2>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <DirectionsBikeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${props.routes.length}`}
                            secondary="Number of Trips"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${parseInt(sumBy(props.routes, 'distance') * 0.000621371)} miles`}
                            secondary="Total Distance"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FastForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={`${(meanBy(props.routes, 'average_speed') * 0.000621371 * 3600).toFixed(2)} mph`}
                            secondary="Average Speed"
                        />
                    </ListItem>
                </List>
            </Grid>
            }
        </Grid>
    );
}

export default Stats;
