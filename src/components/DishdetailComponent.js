import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText } from 'reactstrap';

class Dishdetail extends Component {
    formatDate(date) {
        const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = new Date(date);
        return shortMonths[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    renderComments(comments) {
        if (comments != null) {
            
            const comm = comments.map((c) => {
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

    render() {
        return(
            <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                    <Card>
                        <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name}></CardImg>
                        <CardTitle className="font-weight-bold mt-2 ml-2">{this.props.selectedDish.name}</CardTitle>
                        <CardText className="ml-2">{this.props.selectedDish.description}</CardText>
                    </Card>
                </div>
                <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
                    <h4>Comments</h4>
                    {this.renderComments(this.props.selectedDish.comments)}
                </div>
            </div>
        );
    }
}

export default Dishdetail;