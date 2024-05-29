/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import _map from "lodash/map";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OptionAnswer, TextAnswer } from "./OptionAnswer";
import "./quiz.scss";
export default function ResultQuiz() {
  const navigate = useNavigate();

  const { detail, result } = useSelector((state) => state.quizReducer);

  const [list, setList] = useState({});
  const [current, setCurrent] = useState(0);
  const [hash, setHash] = useState({});

  useEffect(() => {
    if (detail?.listQuestions && result?.historyanswer) {
      let tmp_ques = {};
      let tmp_hash = {};
      _map(
        detail?.listQuestions,
        (item, index) => (tmp_ques[index + 1] = item)
      );
      setCurrent(1);
      setList(tmp_ques);
      _map(
        JSON.parse(result?.historyanswer),
        (item) => (tmp_hash[item.id] = item.answer)
      );
      setHash(tmp_hash);
    } else {
      console.log(321312);
      navigate(ROUTES.QUIZ);
    }
  }, []);

  const getScore = (score, total) => {
    return total === 0 ? 0 : Math.round((score * 100) / total);
  };

  return (
    <section id="section-start_quiz">
      <div className="container py-5">
        <h1 className="ff-title text-center">
          SCORE: {getScore(result?.score, result?.total) || 0}
        </h1>
        <div className="box-quiz p-5">
          <div className="card col-12 p-4 mt-3">
            <div className="card-body">
              <h5 className="m-0 card-title">{list[current]?.name}</h5>
            </div>
          </div>
          <Row className="box-answer none-hover mt-3">
            {list[current]?.type ? (
              <TextAnswer
                key={current}
                answer={hash[list[current]?.id]}
                exact={hash[list[current]?.id] === list[current]?.answer}
                disabled
              />
            ) : (
              <OptionAnswer
                disabled
                current={current}
                list={list}
                answer={hash[list[current]?.id]}
              />
            )}
          </Row>
          <div className="d-flex gap-2 justify-content-center mt-3">
            {_map(list, (item, index) => (
              <Button
                key={index}
                variant={
                  item.id === list[current]?.id ? "danger" : "outline-danger"
                }
                onClick={() => setCurrent(index)}
              >
                {index}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
