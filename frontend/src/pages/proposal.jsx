import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './index.css';

import { Document } from 'react-pdf'

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

    // console.log('prop', this.props);
  }

  componentDidMount() {
    console.log('id', this.props.params.id);
    this.api.getById(this.props.params.id).then(res => {
      console.log('res', res);
      if (res.success) {
        this.setState({ proposal: res.proposal });
      }
    });

    // this.setState({ proposal: { id: 0,
    //   name: 'Proposal name',
    //   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   isclosed: 1
    // }});

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
          status = proposal.isclosed ? 'closed' : 'open',
          accepted = proposal.isclosed && proposal.result === 1,
          tied = proposal.isclosed && proposal.result === 2,
          decision = accepted ? 'accepted' : (tied ? 'tied' : 'declined');

          proposal.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

    return (
      <Grid container spacing={24}>
        <Grid item xs={8} container direction="row" className="centeredContainer singleProposal">
          <Paper className="paper">
            { proposal.key !== undefined ?
              <React.Fragment>
                <h1>
                  {proposal.title}
                  { status === 'open' ?
                  <Chip
                  label="Open for voting"
                  className="chip open"
                  /> :
                  <Chip
                  label={`Proposal ${decision}`}
                  className={`chip ${decision}`}
                  /> }
                </h1>
                <Grid container>
                  <Grid item xs={6}>
                    <p>{proposal.desc}</p>
                  </Grid>
                  <Grid item xs={6} className="pdfPrev">
                    <img src="../img/pdf-prev.png"/>
                  </Grid>
                </Grid>
                { status === 'open' ?
                <React.Fragment>
                  <h1>Vote now</h1>
                  <Grid container spacing={8}>
                    <Grid item xs={6} className="pdfPrev">
                      <Button variant="contained" color="primary" className="voting-btn">
                        Vote Yes
                      </Button>
                    </Grid>
                    <Grid item xs={6} className="pdfPrev">
                      <Button variant="contained" color="primary" className="voting-btn">
                        Vote No
                      </Button>
                    </Grid>
                  </Grid>
                </React.Fragment> : null
              }
              </React.Fragment> :
              <React.Fragment>
                <CircularProgress className="straas-loader" thickness={7} />
              </React.Fragment>
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
