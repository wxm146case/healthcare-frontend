import React, {Component} from 'react';
import './Locations.css'
import {Link} from "react-router-dom";


class Locations extends Component {


    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 41.507812,
                lng: -81.602970
            },
            zoom: 11
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h3 className="location-head">Mayo Clinic Locations</h3>
                    <div className="contentbox"/>
                    <ul className="list-group">
                        <li className="list-group-item" id="location-img" style={{width: '500px'}} >
                            <div>
                                <div className="location-img">
                                    <img src="https://s3.amazonaws.com/msi-wma-static/hospital1.jpg" alt="" style={{height: '250px', width: '330px'}} />
                                </div>
                                <Link to="/locations/arizona">
                                    <h4 className="location-sub">Mayo Clinic's Campus in Arizona</h4>
                                </Link>
                            </div>
                        </li>
                        <li className="list-group-item" id="location-img" style={{width: '500px'}}>
                            <div>
                                <img src="https://s3.amazonaws.com/msi-wma-static/hospital2.jpg" alt="" style={{height: '250px', width: '330px'}} />
                                <Link to="/locations/florida">
                                    <h4 className="location-sub">Mayo Clinic's Campus in Florida</h4>
                                </Link>
                            </div>
                        </li>
                        <li className="list-group-item" id="location-img" style={{width: '500px'}}>
                            <div>
                                <img src="https://s3.amazonaws.com/msi-wma-static/hospital3.jpg" alt="" style={{height: '250px', width: '330px'}} />
                                <Link to="/locations/minnesota">
                                    <h4 className="location-sub">Mayo Clinic's Campus in Minnesota</h4>
                                </Link>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Locations;