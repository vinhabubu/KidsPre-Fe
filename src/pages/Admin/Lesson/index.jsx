/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import _map from "lodash/map";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Lesson/action";
import { actionGetList as callListTopic } from "store/Topic/action";
import { actionGetList as callListUser } from "store/User/action";
import TemplateContent from "../../../components/layout/TemplateContent";
import FormLesson from "./FormLesson";

function Lesson() {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.lessonReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const { list: listTopic } = useSelector((state) => state.topicReducer);
  const { list: listUser } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const onGetListLesson = (body) => dispatch(actionGetList(body));
  const onGetListUser = (body) => dispatch(callListUser(body));
  const onGetListTopic = (body) => dispatch(callListTopic(body));
  const onDeleteLesson = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState(0);
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
      onGetListLesson(params);
      onGetListUser({ page: 1, limit: 50 });
      onGetListTopic({ page: 1, limit: 30 });
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
    onGetListLesson({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const getInfo = (array, id) => {
    return array.find((item) => item.id === id);
  };
  const handleSearch = (id) => {
    const idtopic = !+id ? null : id;
    onGetListLesson({ ...params, page: 1, idtopic });
    setCurrentPage(1);
    if (!idtopic) setTopic(id);
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách bài học"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
        filter={
          <div className="d-flex align-items-end">
            <div style={{ maxWidth: 250 }}>
              <Form.Label htmlFor="topic">Chủ đề</Form.Label>
              <Form.Select
                id="topic"
                aria-label="Chủ đề"
                value={topic}
                onChange={({ target: { value } }) => setTopic(value)}
              >
                {_map([{ id: 0, name: "Tất cả" }, ...listTopic], (item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="ms-2">
              <Button onClick={() => handleSearch(topic)}>Tìm kiếm</Button>
            </div>
            <div className="ms-2">
              <Button
                variant="outline-secondary"
                onClick={() => handleSearch(0)}
              >
                Đặt lại
              </Button>
            </div>
          </div>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên bài học</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Âm thanh </th>
              <th scope="col">Chủ đề </th>
              <th scope="col">Người tạo </th>
              <th scope="col">Người được chia sẻ </th>
              <th scope="col">Hành động </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={8}>
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
                  />
                </td>
                <td className="align-middle"> {item.sound}</td>
                <td className="align-middle">
                  {getInfo(listTopic, item.idtopic)?.name || "-"}
                </td>
                <td className="align-middle">
                  {getInfo(listUser, item.idcreated)?.username || "-"}
                </td>
                <td className="align-middle">
                  {getInfo(listUser, item.idshared)?.username || "-"}
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
                            prev.target === e.target ? !tooltip.visible : true,
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
      <FormLesson
        data={detail}
        listTopic={listTopic}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa bài học này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteLesson(tooltip.id)}
      />
    </div>
  );
}

export default Lesson;
