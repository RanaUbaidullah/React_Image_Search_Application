import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ImageResults = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');

    const handleOpen = (img) => {
        setOpen(true);
        setCurrentImg(img);
    }
    async function toDataURL(url) {
        const blob = await fetch(url).then(res => res.blob());
        return URL.createObjectURL(blob);
    }
    const handleClose = () => {
        setOpen(false);
    }
    async function handleDownload() {
        const a = document.createElement("a");
        a.href = await toDataURL(currentImg);
        a.download = "Download_Img_on_Ubaidullah_website.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    let imageList;

    if (images) {
        imageList = (
            <GridList cols={4}>
                {images.map(img => (
                    <GridTile
                        style={{ padding: '200x' }}
                        title={img.tags}
                        key={img.id}
                        actionIcon={
                            <div>
                                <IconButton onClick={() => handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            </div>
                        }
                    >
                        <img src={img.largeImageURL} alt="" />
                    </GridTile>
                ))}
            </GridList>
        );
    } else {
        imageList = null;
    }

    const actions = [
        // <a href="/path/to/image.png" download>download</a>,
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
