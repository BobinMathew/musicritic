/* @flow */

import React, { Component } from 'react';
import { Artist } from 'spotify-web-sdk';

import { getArtist } from '../../api/SpotifyWebAPI';

import './ArtistPage.css';

type Props = {
    match: any,
};

type State = {
    artist: Artist,
};

class AlbumPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            artist: {},
        };
    }

    componentDidMount() {
        this.updateArtistData(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps: Props) {
        const oldId = this.props.match.params.id;
        const newId = nextProps.match.params.id;
        if (oldId !== newId) {
            this.updateArtistData(newId);
        }
    }

    updateArtistData(id: string) {
        getArtist(id).then((artist) => {
            this.setState({ artist });
        });
    }

    render() {
        const { artist }: State = this.state;
        return (
            <div className="artist-page-header">
                <div className="track-page-header__data">
                    {artist.imageUrl && <img
                      alt="Album"
                      className="track-page-header__cover shadow-lg"
                      src={artist.imageUrl}
                    />}
                    <ArtistInfo artist={artist} />
                </div>
            </div>
        );
    }
}

const ArtistInfo = ({ artist }: State) => (
    <div className="text-center track-info text-light">
        <h1>{artist.name}</h1>
    </div>
);

export default AlbumPage;
