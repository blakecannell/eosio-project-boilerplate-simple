import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import style from './index.css';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

// Index component
class Proposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposal: {}
    };
    this.api = this.props.api;

    console.log('prop', this.props);
  }

  componentDidMount() {
    // this.api.getProposal().then(res => {
    //   if (res.success) {
    //     this.setState({ proposals: res.proposals });
    //   }
    // });

    this.setState({ proposal: { id: 0,
      name: 'Proposal name',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isclosed: 1
    }});

    // isclosed:
    // 0 - Open
    // 1 - Closed

    // result:
    // 0 - No
    // 1 - Yes
    // 2 - Tie
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposal } = this.state,
          status = proposal.isclosed ? 'closed' : 'open';

          console.log('proposal', proposal);
          console.log('status', status);

    return (
      <Grid container spacing={24}>
        <Grid item xs={8} container direction="row" className="centeredContainer singleProposal">
          <Paper className="paper">
            { proposal.id !== undefined ?
              <React.Fragment>
                <h1>
                  {proposal.name}
                  { status === 'open' ?
                  <Chip
                  label="Open"
                  className="chip open"
                  /> :
                  <Chip
                  label="Closed"
                  className="chip closed"
                  /> }
                </h1>
                <p>{proposal.desc}</p>
                { status === 'open' ?
                <React.Fragment>
                  <Button variant="contained" color="primary" className="btn">
                    Vote Yes
                  </Button>
                  <Button variant="contained" color="primary" className="btn">
                    Vote No
                  </Button>
                </React.Fragment> :
                <span>Voting is closed</span> }
              </React.Fragment> :
              <h1>null</h1>
            }
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

Proposal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Proposal);
