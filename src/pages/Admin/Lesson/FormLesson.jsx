/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Lesson/action";
const initialData = {
  name: "",
  image: "",
  idtopic: undefined,
  sound: "",
};

function FormLesson({ data: { type, visible, info }, listTopic, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.lessonReducer);

  const dispatch = useDispatch();
  const onAddLesson = (body) => dispatch(actionAdd(body));
  const onEditLesson = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) setData(info);
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(data);
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      const newData = { ...data };
      if (!newData?.idtopic) newData.idtopic = listTopic[0].id;
      if (type === "create") onAddLesson(data);
      if (type === "edit") onEditLesson(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin bài học",
    edit: "Chỉnh sửa bài học",
    create: "Thêm mới bài học",
  };
  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="Name">
            Tên bài học <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            defaultValue={data.name || ""}
            aria-describedby="helperName"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.name && (
            <Form.Text
              id="helperName"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.name}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="sound">
            Âm thanh <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="sound"
            name="sound"
            defaultValue={data.sound || ""}
            aria-describedby="helperSound"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.sound && (
            <Form.Text
              id="helperSound"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.sound}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="topic">
            Chủ đề <span className="required">*</span>
          </Form.Label>
          <Form.Select
            id="topic"
            aria-label="Chủ đề"
            name="idtopic"
            value={data.idtopic}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(listTopic, (item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">
            Hình ảnh <span className="required">*</span>
          </Form.Label>
          <UploadImage
            image={data.image || ""}
            callback={(url) =>
              handleChange({
                target: {
                  name: "image",
                  value: url,
                },
              })
            }
            geometry="radius"
            showUpload={type !== "detail"}
          />
          {error.image && (
            <Form.Text
              id="helperImage"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.image}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormLesson;
