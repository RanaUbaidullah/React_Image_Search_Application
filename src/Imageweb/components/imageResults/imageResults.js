import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const ImageResults = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');
    const [currentImgTag, setCurrentImgTag] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpen = (img,tag) => {
        setOpen(true);
        setCurrentImg(img);
        setCurrentImgTag(tag)
    }
    
    async function toDataURL(url) {
        const blob = await fetch(url).then(res => res.blob());
        return URL.createObjectURL(blob);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDownload = async () => {
        setLoading(true); // Show loading animation while fetching image data

        const a = document.createElement("a");
        a.href = await toDataURL(currentImg);
        a.download = currentImgTag;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setLoading(false); // Hide loading animation after download
    }

    let imageList;

    if (loading) {
        // Display a loading spinner while fetching image data
        imageList = (
            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                <CircularProgress size={80} thickness={5} />
            </div>
        );
    } else if (images) {
        imageList = (
            <GridList cols={4}>
                {images.map(img => (
                    <GridTile
                        style={{ padding: '200x' }}
                        title={img.tags}
                        key={img.id}
                        actionIcon={
                            <div>
                                <IconButton onClick={() => handleOpen(img.largeImageURL, img.tags)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            </div>
                        }
                    >
                        <img src={img.largeImageURL} loading='lazy' alt="" />
                    </GridTile>
                ))}
            </GridList>
        );
    } else {
        imageList = null;
    }

    const actions = [
        <FlatButton label="Download" primary={true} onClick={handleDownload} />,
        <FlatButton label="Close" primary={true} onClick={handleClose} />,
    ];

    return (
        <div style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }}>
            {imageList}
            <Dialog
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={handleClose}
            >
                <img src={currentImg} alt="" style={{ width: '100%', margin: '10px' }} />
            </Dialog>
        </div>
    )
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;
