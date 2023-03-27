import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Context from "../../../todo/context";
import Alert from "../../Alert";
import { useHttpState, http } from "../../Http";
import TodoList from "../List";

export default function TodoTabList(props) {
  const { tab, list, setList } = React.useContext(Context);
  const [sortDir, setSortDir] = React.useState("asc");

  const sortRows = (field, dir) => {
    let results = list.sort((a, b) => {
      switch (dir) {
        case "asc":
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          }

          break;
        case "desc":
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          }

          break;
      }

      return 0;
    });

    setList([...results]);
  };

  React.useEffect(() => {
    sortRows("created_at", sortDir);
  }, [sortDir]);

  return (
    <Row>
      <Col md="10">
        <Alert {...tab} />

        <Row className="mb-4">
          <Col md="3">
            <Form.Select
              defaultValue={sortDir}
              onChange={({ currentTarget }) => setSortDir(currentTarget.value)}
            >
              <option value="desc">Сначала новые</option>
              <option value="asc">Сначала старые</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="fw-bolder">
          <Col md="2">Дата и время</Col>
          <Col md="2">Название</Col>
          <Col>Описание</Col>
          <Col className="text-end" md="3">
            Действие
          </Col>
        </Row>
        <hr />

        <FetchTodoList />

        {list && list.length ? <TodoList list={list} /> : <TodoEmptyList />}
      </Col>
    </Row>
  );
}

const FetchTodoList = (props) => {
  const { tab, setTab, setList } = React.useContext(Context);
  const httpState = useHttpState({
    request: () => http.get("/backend/web/index.php/api/todo"),
  });

  const Loading = <i className="text-muted">Извлекаем список...</i>;
  const ErrorFallback = ({ error }) => <>{error.message}</>;

  React.useEffect(() => {
    if (tab.key === "list" && tab.loadList) {
      setTab({ ...tab, loadList: false });
      httpState.sendRequest().then((response) => {
        if (response && response.success === true) {
          let rows = response?.data?.rows;
          setList(rows);
        }
      });
    }
  }, [tab.loadList]);

  var component = <></>;
  switch (httpState.status) {
    case "pending":
      component = Loading;
      break;
    case "error":
      component = <ErrorFallback error={httpState.error} />;
      break;
  }

  return component;
};

const TodoEmptyList = (props) => {
  const { setTab } = React.useContext(Context);

  const onClick = () => {
    setTab({ key: "new" });
  };

  return (
    <Row>
      <Col className="text-center p-4" style={{ minHeight: 100 }}>
        <div className="text-muted fs-5 mb-4">Cписок пуст</div>
        <div className="">
          <Button onClick={onClick}>Добавить задачу</Button>
        </div>
      </Col>
    </Row>
  );
};
