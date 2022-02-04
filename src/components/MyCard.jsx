import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

class MyCard extends React.Component {
  render() {
    const { album } = this.props;
    const { artworkUrl100, collectionName, artistName } = album;
    return (
      <Card sx={ { maxWidth: 220, minWidth: 220, margin: '10px' } }>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ artworkUrl100 }
            alt="image capa cd"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {collectionName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {artistName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

MyCard.propTypes = {
  album: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }),
};

MyCard.defaultProps = {
  album: PropTypes.shape({
    artworkUrl100: '',
    collectionName: '',
    artistName: '',
  }),
};

export default MyCard;
