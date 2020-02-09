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
            commute: [
                false,
            ],
            athlete_count: {
                min: 0,
                max: null,
            },
            average_speed: {
                min: 0,
                max: 15,
            },
            name: '',
        }
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.updateAthleteCount = this.updateAthleteCount.bind(this);
    }

    handleSpeedChange(event, newValue) {
        const speedRange = newValue;
        const filters = {
            ...this.state,
            average_speed: {
                min: speedRange[0],
                max: speedRange[1],
            }
        }
        this.props.filterRoutes(filters);
        this.setState({
            average_speed: {
                min: speedRange[0],
                max: speedRange[1],
            }
        });
    }

    onSearchChange(event) {
        const word = event.target.value;
        const filters = {
            ...this.state,
            name: word,
        }
        this.props.filterRoutes(filters);
        this.setState({name: word});
    }

    onCheckboxClick(filterType) {
        return () => {
            const checked = this.state[filterType][0];
            const filters = {
                ...this.state,
                [filterType]: [!checked]
            };
            this.props.filterRoutes(filters);
            this.setState({[filterType]: [!checked]});
        }
    }

    updateAthleteCount() {
        let athlete_count;
        if (this.state.athlete_count.min === 0) {
            athlete_count = {
                min: 2,
                max: null,
            }
        } else {
            athlete_count = {
                min: 0,
                max: null,
            }
        }
        const filters = {
            ...this.state,
            athlete_count: athlete_count
        };
        this.props.filterRoutes(filters);
        this.setState({athlete_count: athlete_count});
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.commute[0]}
                                onChange={this.onCheckboxClick('commute')}
                            />
                        }
                        label="Commutes"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.athlete_count.min === 2}
                                onChange={this.updateAthleteCount}
                            />
                        }
                        label="With Friends"
                    />
                    <div className="search-form-control">
                        <FormControlLabel
                            control={
                                <TextField
                                    id="standard-basic"
                                    label="Ride name contains..."
                                    onChange={this.onSearchChange}
                                />
                            }
                        />
                    </div>
                  <Slider
                      className='mph-slider'
                      value={[this.state.average_speed.min, this.state.average_speed.max]}
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
