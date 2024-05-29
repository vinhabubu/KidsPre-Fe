/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList as callListCategory } from "store/Category/action";
import { actionDelete, actionGetList, resetData } from "store/Quiz/action";
import { actionGetList as callListTopic } from "store/Topic/action";
import TemplateContent from "../../../components/layout/TemplateContent";
import FormQuiz from "./FormQuiz";

const initialData = { query: "", idcategory: 0 };

function Quiz() {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.quizReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const { list: listTopic } = useSelector((state) => state.topicReducer);
  const { list: listCategory } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();
  const onGetListQuiz = (body) => dispatch(actionGetList(body));
  const onGetListCategory = (body) => dispatch(callListCategory(body));
  const onGetListTopic = (body) => dispatch(callListTopic(body));
  const onDeleteQuiz = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) {
      onGetListQuiz({ ...params, limit: 10 });
      onGetListTopic({ page: 1, limit: 30 });
      onGetListCategory({ page: 1, limit: 50 });
    }
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListQuiz({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = (type) => {
    const query = !data.query || type === "reset" ? null : data.query.trim();
    const idcategory =
      !+data.idcategory || type === "reset" ? null : data.idcategory;
    const newParams = _omit(params, ["query", "idcategory"]);
    onGetListQuiz({ ...newParams, page: 1, query, idcategory });
    setCurrentPage(1);
    if (type === "reset") setData(initialData);
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách bài kiểm tra"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
        filter={
          <div className="d-flex align-items-end">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control
                id="search"
                aria-label="Tìm kiếm"
                placeholder="Tìm kiếm"
                name="query"
                value={data.query}
                onChange={handleChange}
              ></Form.Control>
            </div>
            <div className="ms-2" style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="category">Danh mục</Form.Label>
              <Form.Select
                id="category"
                aria-label="Danh mục"
                name="idcategory"
                value={data.idcategory}
                onChange={handleChange}
              >
                {_map([{ id: 0, name: "Tất cả" }, ...listCategory], (item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="ms-2">
              <Button
                onClick={() => handleSearch("filter")}
                disabled={isLoading && _size(list) > 0}
              >
                Tìm kiếm
              </Button>
            </div>
            <div className="ms-2">
              <Button
                variant="outline-secondary"
                disabled={isLoading && _size(list) > 0}
                onClick={() => handleSearch("reset")}
              >
                Đặt lại
              </Button>
            </div>
          </div>
        }
      >
        <div className="custom-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="max-w-max">
                  #
                </th>
                <th scope="col" className="min-w-300px">
                  Tên bài kiểm tra
                </th>
                <th scope="col" className="min-w-150px">
                  Hình ảnh
                </th>
                <th scope="col" className="min-w-100px">
                  Danh mục
                </th>
                <th scope="col" className="min-w-100px">
                  Người tạo
                </th>
                <th scope="col" className="min-w-100px">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && _size(list) === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div
                      className="d-flex justify-content-center align-items-center w-full"
                      style={{ height: 400 }}
                    >
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </td>
                </tr>
              )}
              {_map(list, (item, index) => (
                <tr key={`${index}-${item.created_at}`}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle"> {item.name}</td>
                  <td className="align-middle">
                    <LazyLoadImage
                      src={item.image}
                      alt={item.name}
                      witdh={50}
                      height={50}
                      key={item.image}
                    />
                  </td>
                  <td className="align-middle">{item.category?.name || "-"}</td>
                  <td className="align-middle">
                    {item.created?.username || "-"}
                  </td>
                  <td className="align-middle">
                    <ActionTable
                      propsEdit={{
                        disabled:
                          item.idcreated !== +user.id && item.idcreated !== -1,
                      }}
                      propsDelete={{
                        disabled:
                          item.idcreated !== +user.id && item.idcreated !== -1,
                      }}
                      onDetail={() =>
                        setDetail({ info: item, visible: true, type: "detail" })
                      }
                      onEdit={() =>
                        setDetail({ info: item, visible: true, type: "edit" })
                      }
                      onDelete={(e) => {
                        setTooltip((prev) => {
                          return {
                            visible:
                              prev.target === e.target
                                ? !tooltip.visible
                                : true,
                            target: e.target,
                            id: item.id,
                          };
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading && _size(list) > 0 && (
          <div className="-mb-1">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormQuiz
        data={detail}
        listTopic={listTopic}
        listCategory={listCategory}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa bài kiểm tra này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteQuiz(tooltip.id)}
      />
    </div>
  );
}

export default Quiz;
