import React, {Component} from 'react';
import breakOverSound from '../assets/timeUp.mp3';
import sessionOverSound from '../assets/Chord_1.mp3';
import './PomodoroClock.css';

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

    audioRef = React.createRef();

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
        const secondsCounter = this.state.minutesCounter === 60
            ? 0
            : this.state.secondsCounter
        this.setState({minutesCounter: minutesCounter})
        if(minutesCounter === 60){
            this.setState({secondsCounter: 0})
       }
    }

    decreaseMinutesCounterHandler = () => {
        const minutesCounter = this.state.minutesCounter > 0
            ? this.state.minutesCounter - 1
            : 60;

        // const secondsCounter = this.state.minutesCounter === 60
        //     ? 0
        //     : this.state.secondsCounter
        this.setState({minutesCounter: minutesCounter})
        if(minutesCounter === 60){
            this.setState({secondsCounter: 0})
       }
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

                <button onClick={this.increaseMinutesCounterHandler}>Next</button>
                <button onClick={this.decreaseMinutesCounterHandler}>Previous</button>
                <button onClick={this.timeStartStopHandler}>Start/Stop</button>
                <button onClick={this.timeStartHandler}>Start Time</button>
                <button onClick={this.timeStopHandler}>Stop Time</button>

                <button onClick={this.resetTimeHandler}>RESET Time</button>

                <div className='timeContainer'>
                    <span id='time'>{minutesCounter <= 9
                            ? '0' + minutesCounter
                            : minutesCounter}
                        : {secondsCounter <= 9
                            ? '0' + secondsCounter
                            : secondsCounter}</span>
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