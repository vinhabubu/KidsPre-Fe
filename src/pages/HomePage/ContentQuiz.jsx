import game from "assets/images/game.png";
import quiz from "assets/images/quiz.png";
import { ROUTES } from "constants/routerWeb";
import React from "react";
import { Link } from "react-router-dom";
const list = [
  {
    image: quiz,
    title: "Grammar and vocabulary",
    desc: "Learn to sing songs in English and watch fun stories and videos!",
    link: ROUTES.QUIZ,
  },
  {
    image: game,
    title: "Fun and games",
    desc: "Play games and practise your speaking with our fun tongue twisters.",
    link: ROUTES.QUIZ,
  },
];
function ContentQuiz() {
  return (
    <section id="content-quiz" className="py-5">
      <div className="container">
        {list.map((item, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0
                ? "d-md-flex flex-row-reverse justify-content-center align-items-center"
                : "d-md-flex justify-content-center align-items-center"
            } mb-3`}
          >
            <div>
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                width={300}
                height={300}
              />
            </div>
            <div className="card card-radius p-4">
              <div className="card-body">
                <h3 className="card-title">
                  <Link to={item.link}>{item.title}</Link>
                </h3>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <Link to={item.link} id="btn-custom" className="btn">
                  Go to quiz!
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContentQuiz;
