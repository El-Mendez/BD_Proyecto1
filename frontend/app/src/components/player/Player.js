import React from 'react';
import Button from "react-bootstrap/Button";
import './player.scss'
import YTPlayer from 'yt-player'
import { FaPauseCircle, FaPlayCircle, FaVolumeUp } from 'react-icons/fa'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: true,
            volume: 100,
        }

        this.handlePlay = this.handlePlay.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        this.player = new YTPlayer('#yt-player', {
            width: 0,
            height: 0,
            autoplay: true,
            controls: false,
            keyboard: false,
            volume: this.state.volume
        });

        this.player.load(this.props.videoId);
    }

    handlePlay() {
        try {
            if (this.state.isPaused) {
                this.player.play();
                this.setState({isPaused: false})
            } else  {
                this.player.pause();
                this.setState({isPaused: true})
            }
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
                <div>
                    Canción
                </div>
                <div>
                    <Button id="playButton" onClick={this.handlePlay}>
                        {item}
                    </Button>
                    <div id='yt-player'/>
                </div>
                <div id="volume-container">
                    <FaVolumeUp size={20} className="colored-icon" />
                    <input
                        type="range"
                        min="0" max="100"
                        defaultValue={this.state.volume}
                        id="volume-slider"
                        onChange={this.handleVolumeChange}/>
                </div>
            </div>
        );
    }
}