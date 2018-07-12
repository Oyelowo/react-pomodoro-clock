import React, {Component} from 'react';

class PomodoroClock extends Component {
    state = {
        secondsCounter: 0,
        minute: 20,
        seconds: 0,
        fullTime:'',
        breakTime: 5,
        counter: 1,
        timeStarted: false
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            if (this.state.timeStarted) {
                this.decreaseTimeHandler()
            }
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    // timeCountDownHandler = () => {         (this.decreaseTimeHandler, 1000)     }
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

    increaseTimeHandler = () => {
        let newTime = this.state.secondsCounter < 60
            ? this.state.secondsCounter + 1
            : 0;
        this.setState({secondsCounter: newTime})
    }

    decreaseTimeHandler = () => {
        let newTime = this.state.secondsCounter > 0
            ? this.state.secondsCounter - 1
            : 59;
            newTime = newTime <= 9 ? '0' + newTime: newTime;
            let min = newTime == 59 ? this.state.minute - 1: this.state.minute
        this.setState({secondsCounter: newTime, minute: min})
    }

    sessionTimeHandler = () => {
        const {secondsCounter, minute} = this.state;
        
    }

    render() {
        return (
            <div className='container'>
                <div>Business Session: {this.state.secondsCounter}
                    <button onClick={this.increaseTimeHandler}>Next</button>
                    <button onClick={this.decreaseTimeHandler}>Previous</button>
                </div>

                <div>Break</div>
                <button onClick={this.timeStartStopHandler}>Start/Stop</button>
                <button onClick={this.timeStartHandler}>Start Time</button>
                <button onClick={this.timeStopHandler}>Stop Time</button>

                <button onClick={this.increaseTimeHandler}>Next</button>
                <button onClick={this.decreaseTimeHandler}>Previous</button>

                <div>minute:{this.state.minute} .....Seconds: {this.state.secondsCounter}</div>
                <div>Time display: {this.state.secondsCounter}</div>
            </div>
        );
    }
}

export default PomodoroClock;