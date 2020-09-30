import React, { Component } from 'react';
import { Loading } from './LoadingComponent';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, 
  Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { baseURL } from '../shared/baseURL';

function formatDate(date) {
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date(date);
    return shortMonths[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function RenderComments({comments, postComment, dishId, errMess}) {
    if (errMess)
      return (<h4>{errMess}</h4>);
    else if (comments!=null) {
        const comm = comments.map((c) => {
            return (
                <div>
                    <li className="mt-2">{c.comment}</li>
                    <li className="mt-2">-- {c.author} , {formatDate(c.date)}</li>
                </div>
            );
        });
        return (
          <React.Fragment>
            <ul className="list-unstyled">{comm}</ul>
            <CommentForm dishId={dishId} postComment={postComment} />
          </React.Fragment>
        );
    }
    else
        return (<div></div>);
}

function RenderDetails({dish}) {
  if (dish != null)  
    return (
      <Card>
        <CardImg width="100%" src={baseURL + dish.image} alt={dish.name}></CardImg>
        <CardTitle className="font-weight-bold mt-2 ml-2">{dish.name}</CardTitle>
        <CardText className="ml-2">{dish.description}</CardText>
      </Card>
    );
}

const Dishdetail = (props) => {
  if (props.dishLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  else if (props.dishErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishErrMess}</h4>
        </div>
      </div>
    );
  }
  
  else if (props.dish != null)
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
            <RenderDetails dish={props.dish}/>
          </div>
          <div className="col-md-5 col-sm-12 col-xs-12 m-1">
            <h4>Comments</h4>
              <RenderComments comments={props.comments} 
                  postComment={props.postComment} 
                  dishId={props.dish.id} 
                  errMess={props.commentsErrMess}
              />
          </div>
        </div>
      </div>
    );
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();

    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
      return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
              <div className="form-group">
                <Label htmlFor="rating"><strong>Rating</strong></Label>
                <Control.select model=".rating" name="rating" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="name"><strong>Your Name</strong></Label>
                <Control.text 
                  model=".name" 
                  name="name" 
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors 
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="comment"><strong>Comment</strong></Label>
                <Control.textarea 
                  model=".comment" 
                  rows="6" 
                  name="comment" 
                  className="form-control" 
                />
              </div>
              <Button type="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Dishdetail;