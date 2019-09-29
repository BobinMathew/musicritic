/* @flow */

import React, { Component } from 'react';
import { Artist } from 'spotify-web-sdk';

import { getArtist } from '../../api/SpotifyWebAPI';

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
            <div className="row album-page border container shadow-sm">
                {artist.images && artist.images.map(element =>
                    <img src={element.url} alt={artist.name} />)}
                {artist.name}
            </div>
        );
    }
}

export default AlbumPage;
