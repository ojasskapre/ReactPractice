import React from 'react';
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseURL } from '../shared/baseURL';

function RenderMenu({dish}) {
  return (
    <Link to={`/menu/${dish.id}`}>
      <Card key={dish.id}>
        <CardImg width="100%" src={baseURL + dish.image} alt={dish.name}></CardImg>
        <CardImgOverlay>
          <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
      </Link>
  );
}

const Menu = (props) => {
  
  const menu = props.dishes.map((dish) => {
    return(
      <div className="col-md-5 col-sm-12 col-xs-12 m-1">
        <RenderMenu dish={dish} />
      </div>
    );
  })

  if (props.dishesLoading)
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  
  else if (props.dishesErrMess)
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishesErrMess}</h4>
        </div>
      </div>
    );
  else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>Menu</h3>
              <hr />
          </div>                
        </div>
        <div className="row">
          { menu }
        </div>
      </div>
    );
}
  
export default Menu;