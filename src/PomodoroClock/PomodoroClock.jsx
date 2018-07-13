import React, {Component} from 'react';

class PomodoroClock extends Component {
    state = {
        secondsCounter: 0,
        minute: 55,
        seconds: 0,
        fullTime: '',
        breakTime: 5,
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

    //    let timeUpSound = document.
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }


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
        let newTime = this.state.secondsCounter < 59
            ? this.state.secondsCounter + 1
            : 0;
        this.setState({secondsCounter: newTime})
    }

    decreaseSecondsHandler = () => {
        let newTime = this.state.secondsCounter > 0
            ? this.state.secondsCounter - 1
            : 59;
        // newTime = newTime <= 9     ? '0' + newTime     : newTime;
        if (this.state.minute == 0 && this.state.secondsCounter == 0) {
            newTime = 0;
        }
        let min = newTime == 59 && this.state.minute > 0
            ? this.state.minute - 1
            : this.state.minute;

        // min = this.state.min <= 9     ? 0 + min     : min;
        this.setState({secondsCounter: newTime, minute: min})
    }

    setSessionTimeHandler = () => {
        this.setState({minute: 25, secondsCounter: 0, isOnSession: true})
    }

    setBreakTimeHandler = () => {
        this.setState({minute: 5, secondsCounter: 0, isOnSession: false})
    }

    resetTimeHandler = () => {
        const resetMinute = this.state.isOnSession
            ? 25
            : 5;

        this.setState({minute: resetMinute, secondsCounter: 0, timeStarted: false})

    }

    increaseMinuteHandler = () => {
        const minute = this.state.minute <= 59
            ? this.state.minute + 1
            : 0;
        this.setState({minute: minute})
    }

    decreaseMinuteHandler = () => {
        const minute = this.state.minute > 0
            ? this.state.minute - 1
            : 60;
        this.setState({minute: minute})
    }

    render() {
        const {minute, secondsCounter} = this.state;

        return (
            <div className='container'>
                <div>
                    <button onClick={this.setSessionTimeHandler}>Business Session</button>
                    : {this.state.secondsCounter}
                    <button onClick={this.increaseMinuteHandler}>Next</button>
                    <button onClick={this.decreaseMinuteHandler}>Previous</button>
                </div>

                <button onClick={this.setBreakTimeHandler}>Break</button>
                <button onClick={this.timeStartStopHandler}>Start/Stop</button>
                <button onClick={this.timeStartHandler}>Start Time</button>
                <button onClick={this.timeStopHandler}>Stop Time</button>

                <button onClick={this.resetTimeHandler}>RESET Time</button>

                <div>{minute <= 9
                        ? '0' + minute
                        : minute}
                    : {secondsCounter <= 9
                        ? '0' + secondsCounter
                        : secondsCounter}</div>
                <div>Time display: {secondsCounter}</div>
                <audio src="../assets/timeUp.mp3"></audio>
            </div>
        );
    }
}

export default PomodoroClock;