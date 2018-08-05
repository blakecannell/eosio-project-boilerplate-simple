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

import _ from 'lodash';

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
      proposal: {},
      hasVoted: false
    };
    this.api = this.props.api;

    // console.log('prop', this.props);
  }

  componentDidMount() {
    this.testHasVoted();

    this.api.getById(this.props.params.id).then(res => {
      console.log('res', res);
      if (res.success) {
        this.setState({
          ...this.state,
          proposal: res.proposal
        });
      }
    });
  }

  testHasVoted() {
    this.api.getVotes().then(results => {
      let hasVoted = false;

      console.log('get votes', this.props.params.id, results);

      _.forEach(results.rows, (row) => {
          if (row.proposal === parseInt(this.props.params.id, 10) && row.voter === 'johnsmith123') {
            hasVoted = true;
          }
          console.log('hasVoted', hasVoted);
      });

      console.log('hasVoted final', hasVoted);
      this.setState({hasVoted: hasVoted});
    })
  }

  voteYes() {
    let parsedId = parseInt(this.props.params.id, 10);
    this.api.castVote({ proposal: parsedId, vote: 1 }).then((res) => {
      this.api.getById(parsedId).then((res) => {
        this.setState({ proposal: res.proposal });
        this.testHasVoted();
      });
    });
  }

  voteNo() {
    let parsedId = parseInt(this.props.params.id, 10);
    this.api.castVote({ proposal: parsedId, vote: 0 }).then((res) => {
      this.api.getById(parsedId).then((res) => {
        this.setState({ proposal: res.proposal });
        this.testHasVoted();
      });
    });
  }

  render() {
    // const { noteTable } = this.state;
    const { classes } = this.props,
          { proposal } = this.state,
          status = proposal.isclosed ? 'closed' : 'open',
          accepted = proposal.isclosed && proposal.result === 1,
          tied = proposal.isclosed && proposal.result === 2,
          decision = accepted ? 'accepted' : (tied ? 'tied' : 'declined');

          let pdfImg, pdfClasses,
            yesBtn = "Vote Yes",
            noBtn = "Vote No";

          if (this.props.params.id === "0") {
            proposal.desc = "Efficient, reliable and sustainable biodiesel power generator Crowdfunding project.";
            pdfImg = "../img/biofuel.jpg";
            pdfClasses = "pdfBio";
            yesBtn = "Contribute $1,000";
            noBtn = "Decline";
          } else if (this.props.params.id === "6") {
            proposal.desc = "Allow Airbnb Rentals within our Strata - See the attached PDF. ";
            pdfImg = "../img/pdf-create.png";
            pdfClasses = "pdfPrev";
          } else {
            proposal.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
            pdfImg = "../img/pdf-prev.png";
            pdfClasses = "pdfPrev";
          }

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
                  <Grid item xs={6} className={pdfClasses}>
                    <img src={pdfImg} />
                  </Grid>
                </Grid>
                { status === 'open' ?
                <React.Fragment>
                  { this.state.hasVoted ?
                    <h1>Thanks for your vote</h1> :
                    <React.Fragment>
                      <h1>Vote now</h1>
                      <Grid container spacing={8}>
                        <Grid item xs={6} className="pdfPrev">
                          <Button variant="contained" color="primary" className="voting-btn" onClick={this.voteYes.bind(this)}>
                            {yesBtn}
                          </Button>
                        </Grid>
                        <Grid item xs={6} className="pdfPrev">
                          <Button variant="contained" color="primary" className="voting-btn">
                            {noBtn}
                          </Button>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  }
                </React.Fragment> : <React.Fragment>
                { decision === 'accepted' ?
                  <h1>Proposal Accepted!</h1> : <h1>Proposal Rejected.</h1> }
                </React.Fragment>
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
