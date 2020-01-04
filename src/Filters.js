import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

class Filters extends React.Component {
    constructor() {
        super()
        this.state = {
            commutes: false,
            nonCommutes: false,
            withFriends: false,
        }
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
    }

    onCheckboxClick(filterRoutes, filterType) {
        return () => {
            const checked = this.state[filterType];
            const filters = {
                ...this.state,
                [filterType]: !checked
            };
            filterRoutes(filters);
            this.setState({[filterType]: !checked});
        }
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.commutes}
                                onChange={this.onCheckboxClick(this.props.filterRoutes, 'commutes')}
                            />
                        }
                        label="Commutes"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.nonCommutes}
                                onChange={this.onCheckboxClick(this.props.filterRoutes, 'nonCommutes')}
                            />
                        }
                        label="Non-Commutes"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.withFriends}
                                onChange={this.onCheckboxClick(this.props.filterRoutes, 'withFriends')}
                            />
                        }
                        label="With Friends"
                    />
                </FormGroup>
            </div>
        );
    }
}

export default Filters;
