import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Context from "../../todo/context";
import { useHttpState, http } from "../Http";

export default function TodoList() {
  const { list } = React.useContext(Context);

  return (
    <>
      {list.map((item) => (
        <ListGroup className="mb-2" as="ul" key={item.id}>
          <ListGroup.Item as="li">
            <TodoListItem {...item} />
          </ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
}

const TodoListItem = (props) => {
  const { setTab, csrfData } = React.useContext(Context);
  const { id, name, description, created_at } = props;
  const httpStateRemove = useHttpState({
    request: () =>
      http.delete(`/backend/web/index.php/api/todo/${id}`, csrfData),
  });

  const handleRemove = (event) => {
    event.preventDefault();
    if (!confirm("Удалить запись?")) return false;

    httpStateRemove.sendRequest().then((response) => {
      setTab({ key: "list", loadList: true, response });
    });
  };

  const handleChange = (event) => {
    event.preventDefault();

    setTab({ key: "edit", data: props });
  };

  const handleView = (event) => {
    event.preventDefault();

    setTab({ key: "view", data: props });
  };

  var parentStyle = {};
  if (httpStateRemove.status === "pending") {
    parentStyle = { ...parentStyle, opacity: 0.5, pointerEvent: "none" };
  }

  return (
    <Row style={parentStyle}>
      <Col className="text-truncate" md="2" title={created_at}>
        {created_at}
      </Col>
      <Col className="text-truncate" md="2" title={name}>
        {name}
      </Col>
      <Col className="text-truncate" title={description}>
        {description}
      </Col>
      <Col className="text-end" md="3">
        <a
          className="text-muted"
          href="#"
          onClick={handleView}
          style={{ marginRight: 10, fontSize: ".9em" }}
        >
          Просмотр
        </a>
        <a
          className="text-muted"
          href="#"
          onClick={handleChange}
          style={{ marginRight: 10, fontSize: ".9em" }}
        >
          Изменить
        </a>
        <a
          className="text-danger"
          href="#"
          onClick={handleRemove}
          style={{ fontSize: ".9em" }}
        >
          Удалить
        </a>
      </Col>
    </Row>
  );
};
