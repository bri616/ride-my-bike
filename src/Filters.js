import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

class Filters extends React.Component {
    constructor() {
        super()
        this.state = {
            commutes: false,
            nonCommutes: false,
            withFriends: false,
            withoutFriends: false,
            searchWord: '',
            speedRange: [0, 15],
        }
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }

    handleSpeedChange(event, newValue) {
        const speedRange = newValue;
        const filters = {
            ...this.state,
            speedRange: speedRange,
        }
        this.props.filterRoutes(filters);
        this.setState({speedRange: speedRange});
    }

    onSearchChange(event) {
        const word = event.target.value;
        const filters = {
            ...this.state,
            searchWord: word,
        }
        this.props.filterRoutes(filters);
        this.setState({searchWord: word});
    }

    onCheckboxClick(filterType) {
        return () => {
            const checked = this.state[filterType];
            const filters = {
                ...this.state,
                [filterType]: !checked
            };
            this.props.filterRoutes(filters);
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
                                onChange={this.onCheckboxClick('commutes')}
                            />
                        }
                        label="Commutes"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.nonCommutes}
                                onChange={this.onCheckboxClick('nonCommutes')}
                            />
                        }
                        label="Non-Commutes"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.withFriends}
                                onChange={this.onCheckboxClick('withFriends')}
                            />
                        }
                        label="With Friends"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.withoutFriends}
                                onChange={this.onCheckboxClick('withoutFriends')}
                            />
                        }
                        label="Without Friends"
                    />
                    <FormControlLabel
                        control={
                            <TextField
                                id="standard-basic"
                                label="Ride name contains..."
                                onChange={this.onSearchChange}
                            />
                        }
                    />

                  <Slider
                      className='mph-slider'
                      value={this.state.speedRange}
                      onChange={this.handleSpeedChange}
                      step={0.5}
                      min={0}
                      max={15}
                      valueLabelDisplay="on"
                  />
                </FormGroup>
            </div>
        );
    }
}

export default Filters;
