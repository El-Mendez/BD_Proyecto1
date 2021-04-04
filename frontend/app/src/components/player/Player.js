import React from 'react';
import Button from "react-bootstrap/Button";
import './player.scss'
import YTPlayer from 'yt-player'
import { FaPauseCircle, FaPlayCircle, FaVolumeUp } from 'react-icons/fa'
import formatSeconds from "../utils/formatSeconds";

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: true,
            volume: 100,
            songLength: 0,
            currentTime: 0,
            unplayed: true,
        }

        this.handlePlay = this.handlePlay.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleTimeJump = this.handleTimeJump.bind(this);
    }

    componentDidMount() {
        this.player = new YTPlayer('#yt-player', {
            width: 0,
            height: 0,
            autoplay: true,
            controls: false,
            keyboard: false,
            volume: this.state.volume,
            currentTime: 0,
        });

        this.player.load(this.props.videoId);

        this.player.on('playing', () => {
            this.setState({isPaused: false});
        });

        this.player.on('paused', () => {
            this.setState({isPaused: true});
        });

        this.player.on('timeupdate', (seconds) => {
            this.setState({currentTime: seconds})
        });

        this.player.on('unstarted', () => {
            this.setState({songLength: this.player.getDuration()})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.videoId !== this.props.videoId){
            this.player.load(this.props.videoId);
            this.setState({unplayed: true})
        }
    }

    handlePlay() {
        try {
            if (this.state.isPaused) {
                this.player.play();

                if (this.state.unplayed){
                    this.setState({unplayed: false, songLength: this.player.getDuration()})
                }
            } else  {
                this.player.pause();
            }
        } catch (e) {}
    }

    handleTimeJump(e) {
        try {
            const desiredTime = e.target.value
            this.player.seek(desiredTime);
            this.setState({currentTime: desiredTime})
        } catch (e) {}
    }

    handleVolumeChange(e) {
        let volume = e.target.value
        this.setState({volume: volume})
        this.player.setVolume(volume);
    }

    render() {
        let item;
        if (this.state.isPaused) {
            item = <FaPlayCircle size={42} className="colored-icon"/>
        } else {
            item = <FaPauseCircle size={42} className="colored-icon"/>
        }

        return (
            <div id="player">
                <div id="song-details-container">
                    <span className="visible-text">{this.props.name}</span>
                    <span className="discrete-text" autoCapitalize="true">{this.props.artist}</span>
                </div>
                <div id="media-controls-container">
                    <Button id="playButton" onClick={this.handlePlay}>
                        {item}
                    </Button>
                    <div id="time-details-container">
                        <span className="discrete-text">{formatSeconds(this.state.currentTime)}</span>
                        <input id="played-time-slider" className="elegant-slider"
                            type="range"
                            min="0" max={this.state.songLength}
                            value={this.state.currentTime}
                            onChange={this.handleTimeJump}/>
                        <span className="discrete-text">{formatSeconds(this.state.songLength)}</span>
                    </div>

                    <div id='yt-player'/>
                </div>
                <div id="volume-container">
                    <FaVolumeUp size={20} className="colored-icon" />
                    <input
                        type="range"
                        min="0" max="100"
                        defaultValue={this.state.volume}
                        className="elegant-slider"
                        onChange={this.handleVolumeChange}/>
                </div>
            </div>
        );
    }
}
