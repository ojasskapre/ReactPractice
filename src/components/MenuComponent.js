import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';


class Menu extends Component {
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return(
                <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                    <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        })

        return (
            <div className="container">
                <div className="row">
                    { menu }
                </div>
            </div>
        ); 
    }
}

export default Menu;