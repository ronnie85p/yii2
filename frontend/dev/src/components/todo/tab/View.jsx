import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../../../todo/context";
import { useHttpState, http } from "../../Http";
import Alert from "../../Alert";

export default function TodoTabEdit(props) {
  const { setTab } = React.useContext(Context);
  const [data, setData] = React.useState(props);
  const { id, name, description, created_at, updated_at } = data;

  const httpStateGet = useHttpState({
    request: (params) => http.get(`/backend/web/index.php/api/todo/${id}`),
  });

  const handleToEdit = (event) => {
    event.preventDefault();

    setTab({ key: "edit", data });
  };

  React.useEffect(() => {
    httpStateGet.sendRequest().then((response) => {
      if (response && response.success === true) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <>
      <Alert {...httpStateGet} />

      {httpStateGet.status === "pending" ? (
        <i className="text-muted">Извлекаем данные...</i>
      ) : (
        <>
          <div className="text-muted" style={{ fontSize: ".9em" }}>
            Создана {created_at}
          </div>
          {updated_at ? (
            <div className="text-muted" style={{ fontSize: ".9em" }}>
              Обновлена {updated_at}
            </div>
          ) : (
            <></>
          )}

          <Row className="mt-4">
            <Col md="1">Название</Col>
            <Col>{name}</Col>
          </Row>

          <Row>
            <Col md="1">Описание</Col>
            <Col>{description}</Col>
          </Row>

          <hr />

          <a href="#" onClick={handleToEdit}>
            Редактировать
          </a>
        </>
      )}
    </>
  );
}
