import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import ReportStats from './ReportStats';
import SessionView from "./SessionView";

class Report extends Component {

    render() {

        let {minutes, talks, learning, attendees} = this.props.reportStats;

        return (
            <div className="Report">
                <Row center="xs">
                    <Col xs={10}>
                        <ReportStats minutes={minutes} talks={talks} learning={learning}
                                     attendees={attendees}></ReportStats>
                    </Col>
                </Row>
                <SessionView talk={this.props.talk}/>
            </div>
        );
    }
}
export default Report;
