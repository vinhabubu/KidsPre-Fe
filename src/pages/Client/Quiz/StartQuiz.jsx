/* eslint-disable react-hooks/exhaustive-deps */
import CountDown from "components/common/CountDown";
import CustomTooltip from "components/common/CustomTooltip";
import { ROUTES } from "constants/routerWeb";
import _has from "lodash/has";
import _map from "lodash/map";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionDetail, actionSubmit } from "store/Quiz/action";
import { OptionAnswer, TextAnswer } from "./OptionAnswer";
import "./quiz.scss";
export default function StartQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    detail,
    actionStatus: { isLoading, isSuccess },
    submitStatus: { isLoading: submiting, isSuccess: success },
  } = useSelector((state) => state.quizReducer);
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onGetDetailQuiz = (id) => dispatch(actionDetail(id));
  const onSubmitQuiz = (params) => dispatch(actionSubmit(params));
  const [list, setList] = useState({});
  const [current, setCurrent] = useState(0);
  const [hash, setHash] = useState({});
  const [time, setTime] = useState(0);

  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    const startQuiz = JSON.parse(sessionStorage.getItem("start_quiz")) || {};
    const hashQuiz = JSON.parse(sessionStorage.getItem("answer_quiz")) || {};
    const submitQuiz = JSON.parse(sessionStorage.getItem("submit_quiz")) || {};

    if (!_has(startQuiz, id)) {
      const seconds = 5 * 60 - 1; // Đặt thời gian là 5 phút (5 * 60 giây)
      const futureTime = new Date().getTime() + seconds * 1000; // Thời điểm sau 5 phút
      startQuiz[id] = futureTime;

      setTime(seconds);
      sessionStorage.setItem("start_quiz", JSON.stringify(startQuiz));
      sessionStorage.removeItem("submit_quiz");
    } else {
      if (startQuiz[id] < new Date().getTime()) {
        if (!submiting && !submitQuiz) handleSubmit();
      } else {
        setTime((startQuiz[id] - new Date().getTime()) / 1000);
        if (!isLoading) {
          onGetDetailQuiz(id);
        }
      }
    }
    if (_has(hashQuiz, id)) {
      setHash(hashQuiz[id]);
    }

    return () => {
      // second
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      let tmp_ques = {};
      _map(detail.listQuestions, (item, index) => (tmp_ques[index + 1] = item));
      setCurrent(1);
      setList(tmp_ques);
    }
  }, [isSuccess]);

  useEffect(() => {
    const submitQuiz = JSON.parse(sessionStorage.getItem("submit_quiz")) || {};
    if (success && submitQuiz?.id) {
      navigate(ROUTES.RESULT_QUIZ.replace(":id", id));
    }
  }, [success]);

  const handleAnswer = (answer) => {
    setHash((prev) => {
      sessionStorage.setItem(
        "answer_quiz",
        JSON.stringify({ [id]: { ...prev, [list[current].id]: answer } })
      );
      return { ...prev, [list[current].id]: answer };
    });

    setCurrent((prev) => {
      const newPos = +prev + 1;
      if (newPos > _size(list)) return 1;
      return newPos;
    });
  };

  const handleEnterAnswer = (event) => {
    if (event.key === "Enter") {
      const answer = event.target.value;
      handleAnswer(answer);
    }
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const handleSubmit = () => {
    // sessionStorage.removeItem("answer_quiz");
    sessionStorage.setItem("submit_quiz", JSON.stringify({ id }));
    const payload = {
      idquiz: id,
      iduser: user.id,
      total: _size(list),
      list: _map(hash, (value, key) => ({ id: key, answer: value })),
    };
    onSubmitQuiz(payload);
    onCloseTooltip();
  };

  return (
    <section id="section-start_quiz">
      <div className="container py-5">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: 400 }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isSuccess && (
          <div className="box-quiz p-5">
            <CountDown seconds={time} callback={handleSubmit}></CountDown>
            <div className="card col-12 p-4 mt-3">
              <div className="card-body">
                <h5 className="m-0 card-title">{list[current]?.name}</h5>
              </div>
            </div>
            <Row className="box-answer mt-3">
              {list[current]?.type ? (
                <TextAnswer
                  key={current}
                  handleEnterAnswer={handleEnterAnswer}
                  answer={hash[list[current]?.id]}
                />
              ) : (
                <OptionAnswer
                  handleAnswer={handleAnswer}
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
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-submit-quiz"
                disabled={submiting}
                onClick={(e) =>
                  setTooltip((prev) => {
                    return {
                      visible:
                        prev.target === e.target ? !tooltip.visible : true,
                      target: e.target,
                      id: list[current]?.id,
                    };
                  })
                }
              >
                {submiting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Submit a Quiz
              </button>
            </div>
          </div>
        )}
        <CustomTooltip
          content="Thời gian chưa hết, bạn có chắc là muốn nạp bài sớm không"
          tooltip={tooltip}
          loading={tooltip.visible && isLoading}
          onClose={onCloseTooltip}
          onDelete={handleSubmit}
        />
      </div>
    </section>
  );
}
