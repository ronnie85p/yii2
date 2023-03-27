import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../../../todo/context";
import { http } from "../../Http";
import { useForm } from "../../Form";
import Button from "../../Form/Button";
import FieldError from "../../Form/FieldError";
import Asterix from "../../Form/Asterix";
import Alert from "../../Alert";

export default function TodoTabNew(props) {
  const { setTab, csrfData } = React.useContext(Context);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      ...csrfData,
    },
    actionRequest: (values) =>
      http.post("/backend/web/index.php/api/todo", values).then((response) => {
        if (response.success) {
          setTab({ key: "list", loadList: true, response });
        }

        return response;
      }),
  });

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit(event);
      }}
    >
      <Row>
        <Col md="6">
          <Alert {...form} />

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Название <Asterix />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="name"
                placeholder="Название"
                autoComplete="off"
                onChange={form.handleChange}
                isInvalid={!!form.errors.name}
                autoFocus
              />
              <FieldError>{form.errors.name}</FieldError>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Описание <Asterix />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Описание"
                autoComplete="off"
                onChange={form.handleChange}
                isInvalid={!!form.errors.description}
                style={{ minHeight: 100 }}
              />
              <FieldError>{form.errors.description}</FieldError>
            </Col>
          </Form.Group>

          <hr />

          <Button type="submit">Сохранить</Button>
        </Col>
      </Row>
    </Form>
  );
}
