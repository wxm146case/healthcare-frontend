import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ArizonaLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 33.585918,
                lng: -111.793993
            },
            zoom: 15
        }
    }

    renderPointer = () => {
        return (
            <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="" />
        )
    };

    render() {
        return (
            <div>
                <div style={{ height: '50vh', width: '80%'}} className="google-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBmhuhoQIsrv_-_GEUz5Oyd2-KqmmiVBKM' }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        <AnyReactComponent
                            lat={33.585918}
                            lng={-111.793993}
                            text={this.renderPointer()}
                        />
                    </GoogleMapReact>
                </div>
                <div style={{height: '50px'}} />
                <div className="contentbox" />
                <div className="card" style={{width: '500px'}}>
                    <div className="card-body">
                        <h5 className="card-title">Arizona — Scottsdale/Phoenix</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Mayo Clinic</h6>
                        <p className="card-text">13400 E. Shea Blvd.
                            Scottsdale, AZ 85259</p>
                        <Link to="/" className="card-link">Learn More</Link>
                    </div>
                </div>
            </div>

        );
    }

}

export default ArizonaLocation;