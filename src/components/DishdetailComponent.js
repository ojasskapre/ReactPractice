import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText } from 'reactstrap';

class Dishdetail extends Component {
    formatDate(date) {
        const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = new Date(date);
        return shortMonths[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    renderComments(dish) {
        if (dish!=null && dish.comments != null) {
            
            const comm = dish.comments.map((c) => {
                return (
                    <div>
                        <li className="mt-2">{c.comment}</li>
                        <li className="mt-2">-- {c.author} , {this.formatDate(c.date)}</li>
                    </div>
                );
            });
            return (
                <ul className="list-unstyled">{comm}</ul>
            );
        }
        else
            return (<div></div>);
    }

    renderDetails(dish) {
      if (dish != null)  
        return (
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardTitle className="font-weight-bold mt-2 ml-2">{dish.name}</CardTitle>
            <CardText className="ml-2">{dish.description}</CardText>
          </Card>
        );
    }

    render() {
        return(
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                {this.renderDetails(this.props.dish)}    
              </div>
              <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                <h4>Comments</h4>
                {this.renderComments(this.props.dish)}
              </div>
            </div>
          </div>
        );
    }
}

export default Dishdetail;