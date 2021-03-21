import React from 'react';
import Button from "react-bootstrap/Button";
import './player.scss'
import YTPlayer from 'yt-player'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: true
        }

        this.handlePlay = this.handlePlay.bind(this);
    }

    componentDidMount() {
        this.player = new YTPlayer('#yt-player', {
            width: 0,
            height: 0,
            autoplay: true,
            controls: false,
            keyboard: false,
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


    render() {
        let item;
        if (this.state.isPaused) {
            item = <FaPlayCircle />
        } else {
            item = <FaPauseCircle />
        }

        return (
            <div>PLAYER
                <Button onClick={this.handlePlay}>
                    {item}
                </Button>
                <div id='yt-player'/>
            </div>
        );
    }
}