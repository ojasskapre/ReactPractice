import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';

function RenderMenu({dish, onClick}) {
  return (
    <Card key={dish.id} onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
      <CardImgOverlay>
        <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return(
      <div className="col-md-5 col-sm-12 col-xs-12 mt-1">
        <RenderMenu dish={dish} onClick={props.onClick} />
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
  
export default Menu;