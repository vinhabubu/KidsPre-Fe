/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Topic/action";
import FormTopic from "./FormTopic";
function Topic(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.topicReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));
  const onDeleteTopic = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
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
    if (!isLoading) onGetListTopic({ ...params, limit: 10 });
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListTopic({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách chủ đề"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
        <div className="custom-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="max-w-max">
                  #
                </th>
                <th scope="col" className="min-w-100px">
                  Chủ đề
                </th>
                <th scope="col" className="min-w-100px">
                  Hình ảnh
                </th>
                <th scope="col" className="min-w-150px">
                  Video
                </th>
                <th scope="col" className="min-w-300px">
                  Mô tả
                </th>
                <th scope="col" className="min-w-150px">
                  Tên tiểu luận
                </th>
                <th scope="col" className="min-w-300px">
                  Nội dung tiểu luận
                </th>
                <th scope="col" className="min-w-100px">
                  Hành động
                </th>
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
              {list.map((item, index) => (
                <tr key={item.updatedat + index}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">
                    <LazyLoadImage
                      src={item.image}
                      alt={item.name}
                      witdh={50}
                      height={50}
                    />
                  </td>
                  <td className="align-middle">{item.video || "_"}</td>
                  <td className="align-middle">{item.description || "_"}</td>
                  <td className="align-middle">{item.nameessay || "_"}</td>
                  <td className="align-middle">{item.contentessay || "_"}</td>
                  <td className="align-middle" style={{ width: 200 }}>
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
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormTopic
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />

      <CustomTooltip
        content="Bạn có chắc muốn xóa chủ đề này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteTopic(tooltip.id)}
      />
    </div>
  );
}

export default Topic;
