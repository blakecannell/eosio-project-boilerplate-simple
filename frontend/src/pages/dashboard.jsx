import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
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
      console.log("GET ALL", res);
      if (res.success) {
        this.setState({ proposals: res.rows });
      }
    });
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposals } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={8} container direction="row" className="centeredContainer singleProposal">
            <Paper className="paper">
              <h1>Active Proposals</h1>
              {proposals.map((prop, i) => {
                return <Grid item xs={12}>
                  <Link to={`/proposal/${prop.documenthash}`}>
                    <Paper key={i} className={classes.paper}>
                      {prop.title}
                      <Avatar className="proposalInfo">
                        <AssignmentIcon />
                      </Avatar>
                    </Paper>
                  </Link>
                </Grid>
              })}
              <Button variant="contained" color="primary" className="btn">
                <Link to="/create">
                  Create Proposal
                </Link>
              </Button>
            </Paper>
          </Grid>
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
