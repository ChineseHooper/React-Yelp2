import React from 'react';
import './BusinessList.css';
import Business from '../Bussiness/Business';

class BusinessList extends React.Component{
    render(){
        return(
            <div className="BusinessList">
                { this.props.businesses.map((business,i) => <Business key={business.id} business={business}/>) }
            </div>
        )
    }
}

export default BusinessList;