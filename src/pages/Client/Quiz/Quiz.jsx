/* eslint-disable react-hooks/exhaustive-deps */
import trophy from "assets/images/trophy.png";
import Widget from "components/widget";
import { ROUTES } from "constants/routerWeb";
import { parserRouter } from "helper/function";
import _size from "lodash/size";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionGetList } from "store/Quiz/action";
function Quiz() {
  const {
    listStatus: { isLoading, isLoadmore },
    list,
    params,
    meta: { total },
  } = useSelector((state) => state.quizReducer);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onGetListQuiz = (params, isLoadmore) =>
    dispatch(actionGetList(params, isLoadmore));

  // const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading && list.length === 0) onGetListQuiz({ ...params, limit: 4 });
    window.scrollTo(0, 0);
    // return () => {
    //   onResetData();
    // };
  }, []);

  const handleLoadmore = () => {
    onGetListQuiz({ ...params, page: params.page + 1 }, true);
  };

  return (
    <section className="pb-5" id="section-topic">
      <div className="container">
        {isLoading && _size(list) === 0 && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {_size(list) !== 0 && (
          <>
            <h2 className="ff-title py-3">
              <b>Quizs</b>
            </h2>
            <div className="fs-5 text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
              voluptate corporis, dolore dolorum, corrupti saepe veniam
              consequatur nam sunt delectus debitis odio ratione sint eveniet.
            </div>
            <Row className="mt-5">
              <Col xs>
                {_size(list) !== 0 && (
                  <>
                    <div>
                      <h4 id="content" className="ff-title">
                        Content
                      </h4>
                      <Row className="gap-5">
                        {list.map((item, index) => (
                          <Col xs="12" key={index}>
                            <div className="d-sm-flex">
                              <div
                                className="bg-image"
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                              <Card className="p-4 card-radius w-100">
                                <Card.Body>
                                  <img
                                    className="position-absolute end-0 top-0 trophy"
                                    src={trophy}
                                    alt="trophy"
                                    width={64}
                                    height={64}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      navigate(
                                        ROUTES.RANK_QUIZ.replace(":id", item.id)
                                      )
                                    }
                                  />
                                  <Card.Title>{item.name}</Card.Title>

                                  <Card.Text>
                                    {item.description ||
                                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, unde mollitia. Nesciunt illo explicabo quisquam?"}
                                  </Card.Text>
                                  <Link
                                    to={parserRouter(
                                      ROUTES.START_QUIZ,
                                      item.id
                                    )}
                                  >
                                    <Button
                                      id="btn-custom"
                                      className="border border-danger"
                                    >
                                      Start Quiz!
                                    </Button>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
                        ))}
                        {total > list.length && (
                          <div className="text-center">
                            <Button
                              id="btn-custom"
                              className="border border-danger"
                              onClick={handleLoadmore}
                            >
                              {isLoadmore && (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                              Loadmore
                            </Button>
                          </div>
                        )}
                      </Row>
                    </div>
                  </>
                )}
              </Col>
              <Col className="hidden-widget" lg="auto" style={{ width: 280 }}>
                <Widget />
              </Col>
            </Row>
          </>
        )}
      </div>
    </section>
  );
}
export default Quiz;
