import React, { Component, Fragment } from 'react'
import { UseFetch } from './hooks/UseFetch';

export default class CoinRow extends Component {

    constructor(props) {

        super(props);
        this.state = {

            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {

        const {data, error} = UseFetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false");

        if(!error){
            this.setState({
                isLoaded: true,
                items: data
            })
        }
        else{
            this.setState({
                isLoaded: true,
                error:error
            });
        }
        
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                /*<ul>
                {items.map(item => (
                    <li key={item.objectID}>
                    {item.usd}
                    </li>
                ))}
                </ul>*/
                <Fragment>
                    <img src={items.image.thumb} alt="" />
                </Fragment>
                
            )
        }
    }
}
