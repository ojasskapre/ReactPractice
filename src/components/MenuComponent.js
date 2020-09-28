import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';

import Dishdetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        };
    }

    onSelectDish(dish) {
        this.setState({selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null) 
            return (<Dishdetail selectedDish = {this.state.selectedDish} />);    // Calling DishdetailComponent to view details of selected dish
        else
            return (<div></div>);
    }
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return(
                <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                    <Card key={dish.id} onClick={() => this.onSelectDish(dish)}>
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
                {this.renderDish(this.state.selectedDish)}
            </div>
        ); 
    }
}

export default Menu;