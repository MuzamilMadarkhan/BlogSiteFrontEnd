import React from "react";
import Card from "react-bootstrap/Card";
function BlogCard({ user_id, title, body }) {
  return (
    <div className="container">
      <Card className="m-4"  border="info">
        <Card.Body>
          <Card.Title>{user_id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><b>{title}</b></Card.Subtitle>
          <Card.Text><h5>{body}</h5></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default BlogCard;