import React, {Component} from 'react';

class PomodoroClock extends Component {
    state = {
        secondsCounter: 0,
        minutesCounter: 25,
        fullTime: '',
        breakTime: 5,
        counter: 1,
        timeStarted: false,
        isOnSession: true
    }

    myRef = React.createRef();

    componentDidMount() {
        this.timerID = setInterval(() => {
            if (this.state.timeStarted) {
                this.decreaseSecondsHandler();
            }
        }, 1000);
    }

    componentDidUpdate() {
        const {minutesCounter, secondsCounter, timeStarted} = this.state;
        if (minutesCounter === 0 && secondsCounter === 0 && timeStarted) {
            this.playSound();
            this.setState({timeStarted: false})
        }

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearTimeout(this.setTimeOut);
    }

    playSound = () => {
        // let timeUpSound = document.getElementById('timeUpSound');
        // timeUpSound.currentTime = 0; timeUpSound.play();
        this
            .myRef
            .current
            .play()
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
        if (this.state.minutesCounter == 0 && this.state.secondsCounter == 0) {
            newTime = 0;
        }
        let min = newTime == 59 && this.state.minutesCounter > 0
            ? this.state.minutesCounter - 1
            : this.state.minutesCounter;

        // min = this.state.min <= 9     ? 0 + min     : min;
        this.setState({secondsCounter: newTime, minutesCounter: min})
    }

    setSessionTimeHandler = () => {
        this.setState({minutesCounter: 25, secondsCounter: 0, isOnSession: true})
    }

    setBreakTimeHandler = () => {
        this.setState({minutesCounter: 5, secondsCounter: 0, isOnSession: false})
    }

    resetTimeHandler = () => {
        const resetMinutesCounter = this.state.isOnSession
            ? 25
            : 5;

        this.setState({minutesCounter: resetMinutesCounter, secondsCounter: 0, timeStarted: false})

    }

    increaseMinutesCounterHandler = () => {
        const minutesCounter = this.state.minutesCounter <= 59
            ? this.state.minutesCounter + 1
            : 0;
        this.setState({minutesCounter: minutesCounter})
    }

    decreaseMinutesCounterHandler = () => {
        const minutesCounter = this.state.minutesCounter > 0
            ? this.state.minutesCounter - 1
            : 60;
        this.setState({minutesCounter: minutesCounter})
    }

    render() {
        const {minutesCounter, secondsCounter} = this.state;

        return (
            <div className='container'>
                <div>
                    <button onClick={this.setSessionTimeHandler}>Business Session</button>
                    : {this.state.secondsCounter}
                    <button onClick={this.increaseMinutesCounterHandler}>Next</button>
                    <button onClick={this.decreaseMinutesCounterHandler}>Previous</button>
                </div>

                <button onClick={this.setBreakTimeHandler}>Break</button>
                <button onClick={this.timeStartStopHandler}>Start/Stop</button>
                <button onClick={this.timeStartHandler}>Start Time</button>
                <button onClick={this.timeStopHandler}>Stop Time</button>

                <button onClick={this.resetTimeHandler}>RESET Time</button>
                <button onClick={this.playSound}>Play sound</button>

                <div>{minutesCounter <= 9
                        ? '0' + minutesCounter
                        : minutesCounter}
                    : {secondsCounter <= 9
                        ? '0' + secondsCounter
                        : secondsCounter}</div>
                <div>Time display: {secondsCounter}</div>
                <audio
                    id='timeUpSound'
                    ref={this.myRef}
                    src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"></audio>
            </div>
        );
    }
}

export default PomodoroClock;