import React, {Component} from 'react';
import {BrowserRouter as Router, Route, browserHistory, Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Talk from './components/Talk';
import TopRated from './components/TopRated';
import UserEmail from './components/UserEmail';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import NavButtons from './components/NavButtons';
import Dexie from 'dexie';

import testImage from '../test/snapshot/images/test-image.jpeg';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#ff9e19',
        textColor: '#fff'
    },
    appBar: {
        height: '75px'
    }
});

const talkDetail =
    {
        dayNo: 'One',
        sTime: '10:00',
        room: 'Mezzanine',
        title: 'Welcome to Devoxx 2017',
        description: 'Join the organisers of Devoxx UK and great keynote ' +
        'speakers for inspring stories in 20 minute segments.',
        rating: 4,
        topTracks: [
            'Java',
            'Devoxx',
            'Spring',
        ],
        notes: 'Lorem ipsum dolor sit amet, everti quaestio mel ea. Ex eos ' +
        'volutpat qualisque. Sale tantas cotidieque quo ut, ad nostro consectetuer' +
        ' nec. Feugiat qualisque quo an. Labores officiis te nam.',
        review: {
            name: 'Test User',
            comment: 'Great session, thanks for organising. Looking forward to the next one!',
            image: testImage
        },
        speakers: [
            {
                name: 'Test Speaker',
                company: 'Capgemini',
                blog: 'personalblog.com',
                talks: [
                    'Intro to Devoxx (Room 1 - 11:45)',
                    'Intro to Devoxx 2 (Room 2 - 13:45)'
                ]
            }
        ]
    };


const reportStatsData =
    {
        minutes: 455,
        talks: 10,
        learning: "Spring, Java",
        attendees: 435
    };

let db;

class App extends Component {

    constructor () {
        super();
        this.state = { uuidPresent: true };
        //Define indexeddb instance/version
        db = new Dexie('devoxx-db');
        db.version(1).stores({record: 'id,uuid'});

        //open connection to indexeddb - display error if connection failed
        db.open().catch((error => {
            alert('uuidDb could not be accessed: ' + error);
        }));

        this.rootComponent = this.rootComponent.bind(this);
        this.uuidExists = this.uuidExists.bind(this);
        this.uuidExists();
    }

    uuidExists = () => {
        //open connection to indexeddb - display error if connection failed
        db.open('devoxx-db').catch((error => {
            alert('uuidDb could not be accessed: ' + error);
        }));
        db.record && db.record.get('0').then((resolution) => {
            if (resolution) {
                this.setState({ uuidPresent: true });
            } else {
                throw new Error("No UUID");
            }
        }).catch(error => {
            this.setState({ uuidPresent: false })
        });
    };

    rootComponent() {
        return <UserEmail db={db} />;
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Router history={browserHistory}>
                        <div>
                            { !this.state.uuidPresent && <Redirect to="/login" />}
                            <AppBar
                                title="MyDevoxx"
                                iconElementRight={<NavButtons/>}/>
                            <Route path='/' exact component={Dashboard}/>
                            <Route path='/login'  render={this.rootComponent}/>
                            <Route path="/Dashboard" component={Dashboard}/>
                            <Route path='/report' render={(props) => {
                                return <Report reportStats={reportStatsData} talk={talkDetail}/>}}/>
                            <Route path='/talk/:id' component={Talk}/>
                            <Route path='/top-rated' component={TopRated}/>
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();

export default App;