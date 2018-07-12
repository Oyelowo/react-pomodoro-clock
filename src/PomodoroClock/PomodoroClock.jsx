import React, {Component} from 'react';

class PomodoroClock extends Component {
    state = {
        sessionTime: 25,
        seconds: 9,
        breakTime: 5,
        counter: 1,
        timeStarted: false
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            if (this.state.timeStarted) {
                this.timeIncreaseHandler()
            }
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    // timeCountDownHandler = () => {         (this.timeReducerHandler, 1000)     }
    // }

    timeStartHandler = () => {
        this.setState({
            timeStarted: !this.state.timeStarted
        })
    }

    timeIncreaseHandler = () => {
        let newTime = this.state.sessionTime < 60
            ? this.state.sessionTime + 1
            : 0;
        this.setState({sessionTime: newTime})
    }

    timeReducerHandler = () => {
        let newTime = this.state.sessionTime > 0
            ? this.state.sessionTime - 1
            : 60;
        this.setState({sessionTime: newTime})
    }

    render() {
        return (
            <div>
                <div>Business Session: {this.state.sessionTime}
                    <button onClick={this.timeIncreaseHandler}>Next</button>
                    <button onClick={this.timeReducerHandler}>Previous</button>
                </div>

                <div>Break</div>
                <button onClick={this.timeStartHandler}>Start</button>
                <button onClick={this.timeIncreaseHandler}>Next</button>
                <button onClick={this.timeReducerHandler}>Previous</button>

                <div>Seconds: {this.state.seconds}</div>
                <div>Time display: {this.state.sessionTime}</div>
            </div>
        );
    }
}

export default PomodoroClock;