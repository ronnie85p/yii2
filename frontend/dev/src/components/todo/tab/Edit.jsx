import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../../../todo/context";
import { useHttpState, http } from "../../Http";
import { useForm } from "../../Form";
import Button from "../../Form/Button";
import FieldError from "../../Form/FieldError";
import Asterix from "../../Form/Asterix";
import Alert from "../../Alert";

export default function TodoTabEdit(props) {
  const { csrfData } = React.useContext(Context);
  const [data, setData] = React.useState(props);
  const { id, name, description, created_at, updated_at } = data;

  const httpStateGet = useHttpState({
    request: (params) => http.get(`/backend/web/index.php/api/todo/${id}`),
  });

  const form = useForm({
    initialValues: {
      name,
      description,
      ...csrfData,
    },
    actionRequest: (values) =>
      http.update(`/backend/web/index.php/api/todo/${id}`, values),
  });

  const isPending = httpStateGet.status === "pending";
  const isError = httpStateGet.status === "error";

  React.useEffect(() => {
    httpStateGet.sendRequest().then((response) => {
      if (response && response.success === true) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit(event);
      }}
    >
      <div className="text-muted mb-1">Создана {created_at}</div>
      {updated_at ? (
        <div className="text-muted">Обновлена {updated_at}</div>
      ) : (
        <></>
      )}

      <Row className="mt-4">
        <Col md="6">
          <Alert {...httpStateGet} />
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
                defaultValue={form.values.name}
                onChange={form.handleChange}
                disabled={form.isSubmitting || isPending || isError}
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
                defaultValue={form.values.description}
                onChange={form.handleChange}
                disabled={form.isSubmitting || isPending || isError}
                isInvalid={!!form.errors.description}
                style={{ minHeight: 100 }}
              />
              <FieldError>{form.errors.description}</FieldError>
            </Col>
          </Form.Group>

          <hr />

          <Button
            type="submit"
            disabled={form.isSubmitting || isPending || isError}
          >
            Сохранить
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
