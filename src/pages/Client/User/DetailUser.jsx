import UploadImage from "components/common/UploadImage";
import { format } from "date-fns";
import _capitalize from "lodash/capitalize";
import _omit from "lodash/omit";
import { formatBirthday2 } from "pages/Admin/User/helper";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateUserLogin } from "store/Login/action";
import { actionHistory } from "store/Quiz/action";
import { actionDetail, actionUpdate } from "store/User/action";
/* eslint-disable react-hooks/exhaustive-deps */
const initialData = {
  username: "",
  email: "",
  birthday: "",
  password: "",
};

function DetailUser() {
  const {
    listStatus: { isLoading, isSuccess },
    actionStatus: { isLoading: loading, isSuccess: success },
    detail,
  } = useSelector((state) => state.userReducer);
  const {
    historyStatus: { isLoading: loadingHis },
    history,
  } = useSelector((state) => state.quizReducer);
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onUpdateUser = (body) => dispatch(actionUpdate(body));
  const onGetDetailUser = (id) => dispatch(actionDetail(id));
  const onUpdateUserLogin = (id) => dispatch(actionUpdateUserLogin(id));
  const onGetDetailQuiz = (id) => dispatch(actionHistory(id));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  useEffect(() => {
    if (!isLoading) {
      onGetDetailUser(user?.id);
    }
    if (!loadingHis) {
      onGetDetailQuiz(user?.id);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setData({ ...detail, birthday: formatBirthday2(detail.birthday) });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (success && data.username !== user?.username) {
      onUpdateUserLogin({ username: data.username });
      localStorage.setItem("username", data.username);
    }
  }, [success]);

  const handleSubmit = () => {
    const tmpKey = Object.keys(_omit(data, "image"));
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
      onUpdateUser({
        ...data,
        birthday: data.birthday.split("-").join(""),
      });
    }
  };

  const getScore = (score, total) => {
    return total === 0 ? 0 : Math.round((score * 100) / total);
  };
  return (
    <>
      <div className="container">
        <h4 className="mt-3 ff-title">
          <b>Cập nhật tài khoản</b>
        </h4>
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
          <>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="shadow-sm rounded-4 p-3">
                  <div className="d-flex align-items-center flex-column">
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
                      geometry="circle"
                      showUpload
                    />
                  </div>
                  <div className="w-75 mx-auto text-black-50 text-center mt-3">
                    <small>
                      Allowde *.jpeg, *jpg, *png, *.gif max size of 5 MB
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="form-floating mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Tên tài khoản"
                    value={data.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Tên tài khoản</label>
                </div>
                {error.username && (
                  <small className="text-danger">{error.username}</small>
                )}

                <div className="form-floating mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={data.email}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mt-3">
                  <input
                    type="date"
                    id="Birthday"
                    name="birthday"
                    className="form-control"
                    defaultValue={data.birthday}
                    onChange={handleChange}
                  />
                  <label htmlFor="Birthday">Ngày sinh</label>
                </div>
                <div className="form-floating mt-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Mật khẩu</label>
                </div>
                {error.password && (
                  <small className="text-danger">{error.password}</small>
                )}
                <div className="text-end my-3">
                  <button
                    className="btn btn-submit-quiz"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Save changes
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h5>History Quizs of Yourself</h5>
              <div
                className="border"
                style={{ borderRadius: 50, overflow: "hidden" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        #
                      </th>
                      <th scope="col">Quiz</th>
                      <th scope="col" className="text-center">
                        Score
                      </th>
                      <th scope="col" className="text-center">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => {
                      if (index < 10)
                        return (
                          <tr key={index}>
                            <th scope="row" className="text-center">
                              {index + 1}
                            </th>
                            <td>{item.quizz?.name || "Not found"}</td>
                            <td className="text-center">
                              {getScore(item.score, item.total)}
                            </td>
                            <td className="text-center">
                              {format(
                                new Date(item.createdat * 1000),
                                "dd-MM-yyyy"
                              )}
                            </td>
                          </tr>
                        );
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DetailUser;
