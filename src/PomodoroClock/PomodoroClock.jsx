import React, {Component} from 'react';
import breakOverSound from '../assets/timeUp.mp3';
import sessionOverSound from '../assets/Chord_1.mp3';
import './PomodoroClock.css';

class PomodoroClock extends Component {
    state = {
        secondsCounter: 0,
        minutesCounter: 25,
        breakTime: 5,
        timeStarted: false,
        isOnSession: true
    }

    audioRef = React.createRef();

    componentDidMount() {
        setInterval(() => {
            if (this.state.timeStarted) {
                this.decreaseSecondsHandler();
            }
        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate() {
        const {minutesCounter, secondsCounter, timeStarted} = this.state;

        if (minutesCounter === 0 && secondsCounter === 0 && timeStarted) {
            this.playSound();
            this.setState({timeStarted: false})
        }

    }

    playSound = () => {
        // let timeUpSound = document.getElementById('timeUpSound');
        // timeUpSound.volume=0.1; timeUpSound.currentTime = 0; timeUpSound.play();
        this.audioRef.current.currentTime = 0;
        this
            .audioRef
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
        if (this.state.minutesCounter === 0 && this.state.secondsCounter === 0) {
            newTime = 0;
        }
        let updatedMinute = newTime === 59 && this.state.minutesCounter > 0
            ? this.state.minutesCounter - 1
            : this.state.minutesCounter;
        this.setState({secondsCounter: newTime, minutesCounter: updatedMinute})
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
        const secondsCounter = minutesCounter === 60
            ? 0
            : this.state.secondsCounter
        this.setState({minutesCounter: minutesCounter, secondsCounter: secondsCounter})

    }

    decreaseMinutesCounterHandler = () => {
        const minutesCounter = this.state.minutesCounter > 0
            ? this.state.minutesCounter - 1
            : 60;

        const secondsCounter = minutesCounter === 60
            ? 0
            : this.state.secondsCounter
        this.setState({minutesCounter: minutesCounter, secondsCounter: secondsCounter})

    }

    render() {
        const {minutesCounter, secondsCounter, isOnSession} = this.state;
        return (
            <div className='container'>
                <div className='sessionBreak'>
                    <button
                        style={{
                        backgroundColor: isOnSession
                            ? '#138194'
                            : ''
                    }}
                        onClick={this.setSessionTimeHandler}>Session</button>

                    <button
                        style={{
                        backgroundColor: !isOnSession
                            ? '#138194'
                            : ''
                    }}
                        onClick={this.setBreakTimeHandler}>Break</button>
                </div>

                <div className="timeSection">
                    <div className='minuteChangerBox'>
                        <span onClick={this.increaseMinutesCounterHandler}>
                            <i className="fas fa-arrow-up"></i>
                        </span>
                        <span onClick={this.decreaseMinutesCounterHandler}>
                            <i className="fas fa-arrow-down"></i>
                        </span>
                    </div>
                    <div className='timeContainer'>
                        <span id='time'>{minutesCounter <= 9
                                ? '0' + minutesCounter
                                : minutesCounter}
                            : {secondsCounter <= 9
                                ? '0' + secondsCounter
                                : secondsCounter}</span>
                    </div>
                </div>

                <div className="timeControls">
                    <button onClick={this.timeStartStopHandler}>
                        <i className="fas fa-play">
                            <i className="fas fa-pause"></i>
                        </i>
                        Start/Stop</button>
                    <button onClick={this.timeStartHandler}>
                        <i className="fas fa-play"></i>Start</button>
                    <button onClick={this.timeStopHandler}>
                        <i className="fas fa-pause"></i>Pause</button>

                    <button onClick={this.resetTimeHandler}>
                        <i className="fas fa-sync-alt"></i>Reset</button>
                </div>

                <audio
                    id='timeUpSound'
                    ref={this.audioRef}
                    src={isOnSession
                    ? sessionOverSound
                    : breakOverSound}></audio>

            </div>
        );
    }
}

export default PomodoroClock;