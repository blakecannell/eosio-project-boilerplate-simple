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
    this.state = {};
    console.log("dash construct");
  }

  componentDidMount() {

  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Paper className={classes.paper}>
          Dashboard
        </Paper>
      </Grid>
    );
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
