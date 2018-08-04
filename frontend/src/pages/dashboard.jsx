import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import style from './index.css';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

// Index component
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposals: []
    };
    this.api = this.props.api;
  }

  componentDidMount() {
    this.api.getProposals().then(res => {
      if (res.success) {
        this.setState({ proposals: res.proposals });
      }
    });
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposals } = this.state;

    return (
      <React.Fragment>
        <h2>Active Proposals</h2>
        <Grid container>
          {proposals.map((prop, i) => {
            return <Grid item xs={12}>
              <Paper key={i} className={classes.paper}>
                {prop.name}
              </Paper>
            </Grid>
          })}
        </Grid>
      </React.Fragment>
    );
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
