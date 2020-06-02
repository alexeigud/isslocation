import React, { Component } from 'react';


class App extends Component {
    constructor() {
        super()
        this.state = {
            location: {
                message: null,
                timestamp: null,
                iss_position: {
                    latitude: null, 
                    longitude: null
                }
            }
        }
        this.interval = null;
    }

    async getData() {
        const url = "https://api.open-notify.org/iss-now.json";
        const response = await fetch(url);
        const location = await response.json();

        this.setState({ location });
    }


    async componentDidMount() {
        this.interval = setInterval(async () => await this.getData(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { location } = this.state;
            return (
                <div>
                   {location.message === 'success' &&
                    <p>
                        Latitude: {location.iss_position.latitude} 
                        <br/>
                        Longitude: {location.iss_position.longitude}
                        <br/>
                        Timestamp: {location.timestamp}
                    </p>
                   }
                </div>
            )     
        }
}

export default App