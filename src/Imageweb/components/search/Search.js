import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageResults from "../imageResults/imageResults";

const Search = () => {
    const [searchText, setSearchText] = useState('nature');
    const [images, setImages] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [perPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);
    const apiUrl = 'https://pixabay.com/api';
    const apiKey = '32821962-f14d135f63351ff53eed6ffe6';

    // Function to fetch images from the API
    const fetchImages = () => {
        axios
            .get(
                `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&safesearch=true&page=${currentPage}&per_page=${perPage}`
            )
            .then(res => {
                setImages(res.data.hits);
                setTotalHits(res.data.totalHits);
            })
            .catch(err => console.log(err));
    };

    // Handle search input change
    const handleTextChange = (e) => {
        const val = e.target.value;
        setSearchText(val);
        setCurrentPage(1);
        if (val === '') {
            setImages([]);
        } else {
            fetchImages();
        }
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchText !== '') {
            fetchImages();
        }
    }, [searchText, currentPage, perPage]);

    const totalPages = Math.ceil(totalHits / perPage);

    return (
        <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            <input
                type="text"
                style={{
                    width: '70%',
                    padding: '12px 20px',
                    alignItems: "center",
                    margin: '30px',
                    boxSizing: 'border-box',
                    border: 'none',
                    backgroundColor: '#393b3b',
                    color: 'white',
                    borderRadius: '4px'
                }}
                placeholder="Search for images"
                value={searchText}
                onChange={handleTextChange}
            />
            <br />
            {images.length > 0 ? (
                <div>
                    <ImageResults images={images} />
                    {/* Pagination controls */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => 
                        { 
                            // console.log(first)
                            return(
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={i + 1 === currentPage ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            )
                        }
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Search;

          