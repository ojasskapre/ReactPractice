import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function formatDate(date) {
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date(date);
    return shortMonths[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function renderComments(comments) {
    if (comments!=null) {
        
        const comm = comments.map((c) => {
            return (
                <div>
                    <li className="mt-2">{c.comment}</li>
                    <li className="mt-2">-- {c.author} , {formatDate(c.date)}</li>
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

function renderDetails(dish) {
  if (dish != null)  
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardTitle className="font-weight-bold mt-2 ml-2">{dish.name}</CardTitle>
        <CardText className="ml-2">{dish.description}</CardText>
      </Card>
    );
}

const Dishdetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu"> Menu </Link></BreadcrumbItem>
          <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-sm-12 col-xs-12 m-1">
          {renderDetails(props.dish)}    
        </div>
        <div className="col-md-5 col-sm-12 col-xs-12 m-1">
          <h4>Comments</h4>
          {renderComments(props.comments)}
        </div>
      </div>
    </div>
  );
} 

export default Dishdetail;