/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Topic/action";
const initialData = {
  name: "",
  image: "",
  video: "",
  description: "",
  nameessay: "",
  contentessay: "",
};
function FormTopic({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.topicReducer);

  const dispatch = useDispatch();
  const onAddTopic = (body) => dispatch(actionAdd(body));
  const onEditTopic = (body) => dispatch(actionEdit(body));

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
    const tmpKey = Object.keys(_omit(data, ["nameessay", "contentessay"]));
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
      if (type === "create") onAddTopic(data);
      if (type === "edit") onEditTopic(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin chủ đề",
    edit: "Chỉnh sửa chủ đề",
    create: "Thêm mới chủ đề",
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
            Tên chủ đề <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            defaultValue={data.name}
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
        <div>
          <Form.Label htmlFor="Video">
            Video <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Video"
            name="video"
            defaultValue={data.video}
            aria-describedby="helperVideo"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.video && (
            <Form.Text
              id="helperVideo"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.video}
            </Form.Text>
          )}
        </div>
        <div>
          <Form.Label htmlFor="Desc">
            Mô tả <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Desc"
            name="description"
            defaultValue={data.description}
            aria-describedby="helperDesc"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.description && (
            <Form.Text
              id="helperDesc"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.description}
            </Form.Text>
          )}
        </div>
        <div>
          <Form.Label htmlFor="NameEssay">Tên tiểu luận</Form.Label>
          <Form.Control
            type="text"
            id="NameEssay"
            name="nameessay"
            defaultValue={data.nameessay}
            aria-describedby="helperNameEssay"
            disabled={type === "detail"}
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="ContentEssay">Nội dung tiểu luận</Form.Label>
          <Form.Control
            type="text"
            id="ContentEssay"
            name="contentessay"
            defaultValue={data.contentessay}
            aria-describedby="helperContentEssay"
            disabled={type === "detail"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">
            Hình ảnh <span className="required">*</span>
          </Form.Label>
          <UploadImage
            image={data.image}
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

export default FormTopic;
