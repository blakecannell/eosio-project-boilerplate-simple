import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import PropTypes from 'prop-types';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import style from './index.css';

// api
import Api from '../api';

// pages
import Dashboard from './dashboard';
import Proposals from './proposals';
import Voting from './voting';

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  {"name":"useraaaaaaaa", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"useraaaaaaab", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"useraaaaaaac", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"useraaaaaaad", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"useraaaaaaae", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"useraaaaaaaf", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"useraaaaaaag", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 20,
  },
  shiftRight: {
    marginRight: 20
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0.
  },
  toolbar: theme.mixins.toolbar,
});

// Index component
class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false
    };
    this.handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    this.api = new Api();
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let account = event.target.account.value;
    let privateKey = event.target.privateKey.value;
    let note = event.target.note.value;

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "update";
        actionData = {
          _user: account,
          _note: note,
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const eos = Eos({keyProvider: privateKey});
    const result = await eos.transaction({
      actions: [{
        account: "notechainacc",
        name: actionName,
        authorization: [{
          actor: account,
          permission: 'active',
        }],
        data: actionData,
      }],
    });

    this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "notestruct",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ noteTable: result.rows }));
  }

  componentDidMount() {
    this.getTable();
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <Link to="/" onClick={this.handleDrawerToggle.bind(this)}>
              <ListItemText>Dashboard</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/proposals" onClick={this.handleDrawerToggle.bind(this)}>
              <ListItemText>Proposals</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/voting" onClick={this.handleDrawerToggle.bind(this)}>
              <ListItemText>Voting</ListItemText>
            </Link>
          </ListItem>
        </List>
      </div>
    );

    // generate each note as a card
    const generateCard = (key, timestamp, user, note) => (
      <Card className={classes.card} key={key}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {user}
          </Typography>
          <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
            {new Date(timestamp*1000).toString()}
          </Typography>
          <Typography component="pre">
            {note}
          </Typography>
        </CardContent>
      </Card>
    );
    // let noteCards = noteTable.map((row, i) =>
    //   generateCard(i, row.timestamp, row.user, row.note));

    // <pre className={classes.pre}>
    //   Below is a list of pre-created accounts information for add/update note:
    //   <br/><br/>
    //   accounts = { JSON.stringify(accounts, null, 2) }
    // </pre>

    //

    // <IconButton
    // color="inherit"
    // aria-label="Open drawer"
    // onClick={this.handleDrawerToggle}
    // className={classes.navIconHide}>
    // <MenuIcon />
    // </IconButton>

    return (
      <Router>
        <div>
          <AppBar position="static" color="default" className="allRed">
            <Toolbar className="toolBar">
              <Link to="/" className="logo">
                <Typography variant="title" color="inherit">
                  StraaS
                </Typography>
              </Link>
              <Typography variant="title" color="inherit" className="tagline">
                Strata As A Service...
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>

          <div>
            <Route exact path="/" render={() => (
              <Dashboard api={this.api} />
            )}/>
            <Route path="/proposals" render={() => (
              <Proposals api={this.api} />
            )}/>
            <Route path="/voting" render={() => (
              <Voting api={this.api} />
            )}/>
          </div>
        </div>
      </Router>
    );
  }

}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Index);
