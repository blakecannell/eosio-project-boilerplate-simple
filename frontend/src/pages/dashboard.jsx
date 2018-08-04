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
import Chip from '@material-ui/core/Chip';
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

          console.log('props', proposals);

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={8} container direction="row" className="centeredContainer singleProposal">
            <Paper className="paper">
              <h1>
                Active Proposals
                <Button variant="contained" color="primary" className="btn fr">
                  <Link to="/create">
                    Create Proposal
                  </Link>
                </Button>
              </h1>
              {proposals.map((prop, i) => {
                let status = prop.isclosed ? 'closed' : 'open',
                accepted = prop.isclosed && prop.result === 1,
                tied = prop.result === 2,
                decision = accepted ? 'accepted' : (tied ? 'tied' : 'declined'),
                classes = `home-status ${decision}`;
                return <Grid item xs={12}>
                  <Link to={`/proposal/${prop.key}`}>
                    <Paper key={i} className={`home-list-item ${classes.paper}`}>
                      {prop.title}
                      { status === 'open' ?
                        <Chip
                        label="Open for voting"
                        className="chip open"
                        /> :
                        <Chip
                        label={`Proposal ${decision}`}
                        className={`chip ${decision}`}
                        />
                      }

                    </Paper>
                  </Link>
                </Grid>
              })}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={8} container direction="row" className="centeredContainer budget">
            <Paper className="paper">
              <h1>
                Live Budget
              </h1>
              <Grid container>
                <Grid item xs={4} className="budget-flex">
                  <span><strong>$500,000</strong><br/>
                  / Budget</span>
                </Grid>
                <Grid item xs={4} className="budget-flex">
                  <span><strong>$300,000</strong><br/>
                  / Spent</span>
                </Grid>
                <Grid item xs={4}>
                  <img src="img/budget.png"/>
                </Grid>
              </Grid>
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
