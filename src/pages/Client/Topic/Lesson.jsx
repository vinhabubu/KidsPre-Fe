/* eslint-disable react-hooks/exhaustive-deps */
import ImgCover from "components/common/ImgCover";
import { speak } from "helper/function";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetList, resetData } from "store/Lesson/action";
import VideoPlayer from "./VideoPlayer";
function Lesson() {
  const {
    listStatus: { isLoading, isSuccess },
    list,
    params,
  } = useSelector((state) => state.lessonReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());
  const [lesson, setLesson] = useState(null);
  useEffect(() => {
    if (!isLoading) onGetListTopic({ ...params, limit: 50, idtopic: id });
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLesson(list[0]);
    }
  }, [isSuccess]);

  return (
    <div id="section-lesson">
      {isLoading && _size(list) === 0 && (
        <div className="d-flex justify-content-center align-items-center min-h-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {_size(list) !== 0 && (
        <div className="container pb-5">
          <div className="py-4">
            <h2 className="ff-title">
              <b>Topic - {list[0].topic.name}</b>
            </h2>
            <p className="fs-5 text">{list[0].topic.description}</p>
          </div>

          <div className="row">
            <Col xs="12" lg="10" xl="8" className="mb-5">
              <h4 className="ff-title">
                <b>Video</b>
              </h4>
              <VideoPlayer item={list[0].topic} />
              <div className="mt-3">
                <h4 className="ff-title">
                  <b>{list[0].topic.nameessay}</b>
                </h4>
                <p className="m-0">{list[0].topic.contentessay}</p>
              </div>
            </Col>
            <h4 className="ff-title">
              <b>Lessons</b>
            </h4>
            <div className="col-12 col-md-4 custom-scrollbar max-h-100">
              <Row className="mb-3">
                {list.map((item, index) => (
                  <Col xs="6" lg="4" className="p-2" key={index}>
                    <Card
                      id="lesson-card"
                      className={` h-100 ${
                        lesson && lesson.id === item.id && "active"
                      }`}
                      onClick={() => setLesson(item)}
                    >
                      <Card.Img
                        variant="top"
                        className="card-img"
                        style={{ backgroundImage: `url(${item.image})` }}
                        height={100}
                        width="100%"
                      />
                      <Card.Body>
                        <Card.Title className="custom-text-truncate">
                          {item.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="col-12 col-md-8 p-2">
              {lesson && (
                <div className="position-relative lesson-card overflow-hidden">
                  <ImgCover image={lesson.image} />
                  <div
                    className="position-absolute position-center text-white px-3 rounded"
                    style={{ background: "#3b3a3a9c", fontSize: 150 }}
                  >
                    <b> {lesson.name}</b>
                  </div>
                  <div
                    className="position-absolute end-0 top-0 p-3 rounded"
                    style={{ background: "#3b3a3a9c" }}
                  >
                    <i
                      className="fas fa-volume-up fs-1 text text-white"
                      onClick={() => speak(lesson.name)}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isSuccess && list.length === 0 && (
        <h2 className="ff-title text-center min-h-100">
          Không có bài học nào !
        </h2>
      )}
    </div>
  );
}
export default Lesson;
