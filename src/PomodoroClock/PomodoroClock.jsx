import React, {Component} from 'react';

class PomodoroClock extends Component {
    state = {
        secondsCounter: '00',
        minute: 20,
        seconds: '00',
        fullTime: '',
        breakTime: '05',
        counter: 1,
        timeStarted: false,
        isOnSession: true
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            if (this.state.timeStarted) {
                this.decreaseSecondsHandler();
            }
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    // timeCountDownHandler = () => {         (this.decreaseSecondsHandler, 1000)     }
    // }

    timeStartStopHandler = () => {
        this.setState({
            timeStarted: !this.state.timeStarted
        })
    }

    timeStartHandler = () => {
        this.setState({timeStarted: true})
    }

    timeStopHandler = () => {
        this.setState({timeStarted: false})
    }

    increaseSecondsHandler = () => {
        let newTime = this.state.secondsCounter < 60
            ? this.state.secondsCounter + 1
            : 0;
        this.setState({secondsCounter: newTime})
    }

    decreaseSecondsHandler = () => {
        let newTime = this.state.secondsCounter > 0
            ? this.state.secondsCounter - 1
            : 59;
        newTime = newTime <= 9
            ? '0' + newTime
            : newTime;
        if (this.state.minute == 0 && this.state.secondsCounter == 0) {
            newTime = '0' + 0;
        }
        let min = newTime == 59 && this.state.minute > 0
            ? this.state.minute - 1
            : this.state.minute;

        min = this.state.min <= 9
            ? '0' + min
            : min;
        this.setState({secondsCounter: newTime, minute: min})
    }

    setSessionTimeHandler = () => {
        this.setState({
            minute: 25,
            secondsCounter: ['0' + 0],
            isOnSession: true
        })
    }

    setBreakTimeHandler = () => {
        this.setState({
            minute: ['0' + 1],
            secondsCounter: ['0' + 0],
            isOnSession: false
        })
    }

    resetTimeHandler = () => {
        if (this.state.isOnSession) {
            this.setState({
                minute: 25,
                secondsCounter: ['0' + 0],
                timeStarted: false
            })
        } else {
            this.setState({
                minute: ['0' + 5],
                secondsCounter: ['0' + 0],
                timeStarted: false
            })
        }
    }

    resetBreakTimeHandler = () => {}

    render() {
        return (
            <div className='container'>
                <div>
                    <button onClick={this.setSessionTimeHandler}>Business Session</button>
                    : {this.state.secondsCounter}
                    <button onClick={this.increaseSecondsHandler}>Next</button>
                    <button onClick={this.decreaseSecondsHandler}>Previous</button>
                </div>

                <button onClick={this.setBreakTimeHandler}>Break</button>
                <button onClick={this.timeStartStopHandler}>Start/Stop</button>
                <button onClick={this.timeStartHandler}>Start Time</button>
                <button onClick={this.timeStopHandler}>Stop Time</button>

                <button onClick={this.resetTimeHandler}>RESET Time</button>
                {/* <button onClick={this.resetBreakTimeHandler}>RESET Break</button> */}

                <div>{this.state.minute}
                    : {this.state.secondsCounter}</div>
                <div>Time display: {this.state.secondsCounter}</div>
            </div>
        );
    }
}

export default PomodoroClock;