/* eslint-disable react-hooks/exhaustive-deps */
import _map from "lodash/map";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDashboard,
  actionStaticQuiz,
  actionStaticRank,
} from "store/Dashboard/action";
const enumData = {
  "Tổng số quiz": "totalQuiz",
  "Tổng số câu hỏi": "totalQuestion",
  "Tổng số người dùng": "totalUser",
  "Tổng số danh mục": "totalCategory",
  "Tổng số bài học": "totalLesson",
};
function Dashboard() {
  // const circle = {
  //   options: {
  //     labels: ["Đã bán ra"],
  //   },
  //   series: [70],
  // };
  // const staticQuiz = {
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [
  //         "Tháng 1",
  //         "Tháng 2",
  //         "Tháng 3",
  //         "Tháng 4",
  //         "Tháng 5",
  //         "Tháng 5",
  //         "Tháng 7",
  //         "Tháng 8",
  //       ],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Doanh thu",
  //       data: [1000, 2000, 3000, 4000, 5000, 4500, 4800, 6000],
  //     },
  //   ],
  // };

  const {
    dashboardStatus: { isLoading, isSuccess },
    staticQuizStatus: { isLoading: loading, isSuccess: success },
    staticRankStatus: { isLoading: loadingRank, isSuccess: successRank },
    dashboard,
    staticQuiz,
    staticRank,
  } = useSelector((state) => state.dashboardReducer);

  const dispatch = useDispatch();
  const onGetDashboard = () => dispatch(actionDashboard());
  const onGetStaticQuiz = () => dispatch(actionStaticQuiz());
  const onGetStaticRank = () => dispatch(actionStaticRank());

  useEffect(() => {
    if (!isLoading) {
      onGetDashboard();
    }
    if (!loading) {
      onGetStaticQuiz();
    }
    if (!loadingRank) {
      onGetStaticRank();
    }
  }, []);

  const donut = {
    options: {
      labels: [
        "Tổng số quiz",
        "Tổng số câu hỏi",
        "Tổng số người dùng",
        "Tổng số danh mục",
        "Tổng số bài học",
      ],
    },
    series: [
      dashboard[enumData["Tổng số quiz"]],
      dashboard[enumData["Tổng số câu hỏi"]],
      dashboard[enumData["Tổng số người dùng"]],
      dashboard[enumData["Tổng số danh mục"]],
      dashboard[enumData["Tổng số bài học"]],
    ],
  };

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: staticQuiz.map((item) => item.quizz.name),
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: staticQuiz.map((item) => item.count),
      },
    ],
  };

  return (
    <>
      {(isLoading || loading) && (
        <div
          className="d-flex justify-content-center align-items-center w-full"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {isSuccess && success && (
        <div className="row">
          <div className="col-12 col-sm-6">
            <h2> Thống kê quiz</h2>
            <div className="mixed-chart">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="100%"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <h2>Thông tin cơ bản</h2>
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="100%"
            />
          </div>
        </div>
      )}
      {successRank && (
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Người dùng</th>
                  <th scope="col">Số lần làm Quiz</th>
                </tr>
              </thead>
              <tbody>
                {_map(staticRank, (item, index) => (
                  <tr key={index}>
                    <th scope="row" className="align-middle">
                      {index + 1}
                    </th>
                    <td className="align-middle"> {item.user.username}</td>
                    <td className="align-middle"> {item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* <div className="row">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Doanh thu 2023</h2>
          <div className="mixed-chart">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2>Thống kê đơn hàng</h2>
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            width="100%"
          />
        </div>

        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Doanh thu 2023</h2>
          <Chart
            options={staticQuiz.options}
            series={staticQuiz.series}
            type="line"
            width="100%"
          />
        </div>
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2>Tổng số sản phẩm đã bán ra</h2>
          <Chart
            options={circle.options}
            series={circle.series}
            type="radialBar"
            width="100%"
          />
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;
