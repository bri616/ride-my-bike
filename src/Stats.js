import React from 'react';
import sumBy from 'lodash/sumBy';
import meanBy from 'lodash/meanBy';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PublicIcon from '@material-ui/icons/Public';
import FastForwardIcon from '@material-ui/icons/FastForward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Stats = (props) => {
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <DirectionsBikeIcon />
                </ListItemIcon>
                <ListItemText primary={`Number of Rides: ${props.routes.length}`} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={`Total Distance: ${parseInt(sumBy(props.routes, 'distance') * 0.000621371)} miles`} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FastForwardIcon />
                </ListItemIcon>
                <ListItemText primary={`Average Speed: ${(meanBy(props.routes, 'average_speed') * 0.000621371 * 3600).toFixed(2)} mph`} />
            </ListItem>
        </List>
    );
}

export default Stats;
