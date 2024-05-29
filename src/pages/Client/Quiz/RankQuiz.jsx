/* eslint-disable react-hooks/exhaustive-deps */
import Widget from "components/widget";
import { ROUTES } from "constants/routerWeb";
import { parserRouter } from "helper/function";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actionDetail, actionRank } from "store/Quiz/action";

function RankQuiz() {
  const {
    actionStatus: { isLoading, isSuccess },
    detail,
    rank,
  } = useSelector((state) => state.quizReducer);
  const { id } = useParams();

  const dispatch = useDispatch();
  const onGetDetailQuiz = (id) => dispatch(actionDetail(id));
  const onGetRankQuiz = (id) => dispatch(actionRank(id));

  // const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading) {
      onGetDetailQuiz(id);
      onGetRankQuiz(id);
    }
    window.scrollTo(0, 0);
    // return () => {
    //   onResetData();
    // };
  }, []);

  const getScore = (score, total) => {
    return total === 0 ? 0 : Math.round((score * 100) / total);
  };

  return (
    <section className="pb-5" id="section-topic">
      <div className="container">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isSuccess && (
          <>
            <h2 className="ff-title py-3">
              <b>Rank - {detail.name}</b>
            </h2>
            <Row className="mt-5">
              <Col xs>
                <Row className="gap-5">
                  <Col xs="12">
                    <div className="d-sm-flex">
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: `url(${detail.image})`,
                        }}
                      ></div>
                      <Card className="p-4 card-radius w-100">
                        <Card.Body>
                          <Card.Title>{detail.name}</Card.Title>

                          <Card.Text>
                            {detail.description ||
                              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, unde mollitia. Nesciunt illo explicabo quisquam?"}
                          </Card.Text>
                          <Link to={parserRouter(ROUTES.START_QUIZ, detail.id)}>
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
                </Row>
                <div className="mt-5">
                  <h5>Top 10 rank quiz - {detail.name}</h5>
                  <div
                    className="border"
                    style={{ borderRadius: 50, overflow: "hidden" }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            #
                          </th>
                          <th scope="col">Fullname</th>
                          <th scope="col" className="text-center">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rank.map((item, index) => {
                          if (index < 10)
                            return (
                              <tr key={index}>
                                <th scope="row" className="text-center">
                                  {index + 1}
                                </th>
                                <td>{item.user.username}</td>
                                <td className="text-center">
                                  {getScore(item.score, item.total)}
                                </td>
                              </tr>
                            );
                          return null;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
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
export default RankQuiz;
