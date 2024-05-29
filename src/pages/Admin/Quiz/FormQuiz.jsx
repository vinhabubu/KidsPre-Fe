/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _debounce from "lodash/debounce";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _isString from "lodash/isString";
import _map from "lodash/map";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList, resetData } from "store/Question/action";
import { actionAdd, actionEdit } from "store/Quiz/action";

const initialData = {
  name: "",
  idcategory: undefined,
  image: "",
  groupquestion: [],
  listQuestions: [],
  // idcreated: 1,
};

function FormQuiz({
  data: { type, visible, info },
  listTopic,
  listCategory,
  onClear,
}) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.quizReducer);

  const {
    listStatus: { isLoading: loadingQues },
    list,
    params,
  } = useSelector((state) => state.questionReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onAddQuiz = (body) => dispatch(actionAdd(body));
  const onEditQuiz = (body) => dispatch(actionEdit(body));
  const onGetListQuestion = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());

  const ref = React.createRef();

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) setData(info);
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(_omit(data, ["idcategory"]));

    let validates = true;
    tmpKey.forEach((key) => {
      if (_isEmpty(data[key])) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      const newData = _omit({ ...data, idcreated: +user.id }, [
        "listQuestions",
      ]);
      newData.idtopic = listTopic[0].id;
      if (!newData?.idcategory) newData.idcategory = listCategory[0].id;
      if (_isArray(newData.groupquestion))
        newData.groupquestion = JSON.stringify(newData.groupquestion);
      if (type === "create") onAddQuiz(newData);
      if (type === "edit") onEditQuiz(newData);
    }
  };
  const handleClose = () => {
    onClear();
    onResetData();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin bài kiểm tra",
    edit: "Chỉnh sửa bài kiểm tra",
    create: "Thêm mới bài kiểm tra",
  };

  const handleListQuestion = (search) => {
    let idcategory = data.idcategory;
    if (!data?.idcategory) idcategory = listCategory[0].id;
    onGetListQuestion({
      ...params,
      query: search,
      limit: 30,
      idcategory,
    });
  };
  const debouncedHandleListQuestion = _debounce(handleListQuestion, 500);

  const handleSelectOption = (listOption) => {
    const option = listOption[0];
    if (!!option?.id) {
      ref.current.clear();
      ref.current.blur();
    }
    setError((prev) => ({ ...prev, listQuestions: "" }));
    const isOptionSelected =
      !!option?.id && data.groupquestion.includes(option?.id);

    if (!isOptionSelected) {
      setData((prev) => {
        const newGroup = _isString(prev.groupquestion)
          ? JSON.parse(prev.groupquestion)
          : prev.groupquestion;
        return {
          ...prev,
          groupquestion: [...newGroup, option.id],
          listQuestions: [...prev.listQuestions, option],
        };
      });
    }
  };

  const onRemoveQuestion = (id) => {
    setData((prev) => {
      const newGroup = _isString(prev.groupquestion)
        ? JSON.parse(prev.groupquestion)
        : prev.groupquestion;
      return {
        ...prev,
        groupquestion: newGroup.filter((item) => item !== id),
        listQuestions: prev.listQuestions.filter((item) => item.id !== id),
      };
    });
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
      propsModal={{
        size: "xl",
      }}
    >
      <form className="custom-scrollbar">
        <div className="mt-3">
          <Form.Label htmlFor="category">
            Danh mục <span className="required">*</span>
          </Form.Label>
          <Form.Select
            id="category"
            aria-label="Danh mục"
            name="idcategory"
            value={data.idcategory}
            onChange={handleChange}
            disabled={["detail", "edit"].includes(type)}
          >
            {_map(listCategory, (item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Name">
            Tên bài kiểm tra <span className="required">*</span>
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
          <Form.Label htmlFor="Image">
            Hình ảnh <span className="required">*</span>
          </Form.Label>
          <UploadImage
            image={data.image}
            size={{
              width: 250,
              height: 180,
            }}
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
        <div className="mt-3">
          <Form.Label htmlFor="groupquestion">
            Nhóm câu hỏi <span className="required">*</span>
          </Form.Label>
          <Typeahead
            id="groupquestion"
            ref={ref}
            labelKey="name"
            onChange={handleSelectOption}
            options={loadingQues ? [{ name: "Loading..." }] : list}
            placeholder="Tìm câu hỏi bằng nội dung câu hỏi"
            onInputChange={(search) => debouncedHandleListQuestion(search)}
            onFocus={() => list.length === 0 && handleListQuestion()}
            isLoading={loadingQues}
            disabled={type === "detail"}
            // selected={selectedOption}
            // renderMenu={(results, menuProps) => (
            //   <Menu {...menuProps}>
            //     {results.map((result, index) => (
            //       <MenuItem option={result} position={index}>
            //         {result.name}
            //       </MenuItem>
            //     ))}
            //   </Menu>
            // )}
          />
        </div>
        <div className="mt-3">
          <ListGroup>
            {data.listQuestions.map((item, index) => (
              <ListGroup.Item key={item?.id || index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>{item?.name}</div>
                  <div>
                    <button
                      className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: 30, height: 30 }}
                      disabled={type === "detail"}
                      onClick={() => onRemoveQuestion(item?.id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {error.listQuestions && (
            <Form.Text danger="true" bsPrefix="d-inline-block text-danger lh-1">
              {error.listQuestions}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormQuiz;
