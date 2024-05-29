/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import ToggleSwitch from "components/common/ToggleSwitch";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/User/action";
import FormUser from "./FormUser";
import { formatBirthday, roleEnum } from "./helper";

function Users(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const onGetListUser = (body) => dispatch(actionGetList(body));
  const onDeleteUser = (body) => dispatch(actionDelete(body));
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
    info: null,
  });

  useEffect(() => {
    if (!isLoading) onGetListUser(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListUser({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
    });
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách người dùng"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Mật khẩu</th>
              <th scope="col">Email </th>
              <th scope="col">Ngày sinh </th>
              <th scope="col">Quyền </th>
              <th scope="col">Trạng thái </th>
              <th scope="col">Hành động </th>
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
            {list.map((item, index) => (
              <tr key={item.updatedat + index}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">
                  <LazyLoadImage
                    src={item.image}
                    alt={item.name}
                    witdh={50}
                    height={50}
                  />
                </td>
                <td className="align-middle">{item.username}</td>
                <td className="align-middle">**********</td>
                <td className="align-middle">{item.email}</td>
                <td className="align-middle">{formatBirthday(item)}</td>
                <td className="align-middle">{roleEnum[item.roleid]}</td>
                <td className="align-middle">
                  <ToggleSwitch
                    status={item.active}
                    callback={(e) =>
                      setTooltip((prev) => {
                        return {
                          visible:
                            prev.target === e.target ? !tooltip.visible : true,
                          target: e.target,
                          info: item,
                        };
                      })
                    }
                  />
                </td>
                <td className="align-middle">
                  <ActionTable
                    onDetail={() =>
                      setDetail({ info: item, visible: true, type: "detail" })
                    }
                    onEdit={() =>
                      setDetail({ info: item, visible: true, type: "edit" })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormUser
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />

      <CustomTooltip
        content={`Bạn có chắc muốn ${
          tooltip.info?.active ? "hủy " : ""
        }kích hoạt người dùng này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteUser(tooltip.info.id)}
      />
    </div>
  );
}

export default Users;
