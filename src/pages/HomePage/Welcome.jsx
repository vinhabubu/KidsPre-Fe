import { ROUTES } from "constants/routerWeb";
import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <section id="welcome" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 mx-auto">
            <h1 className="ff-title">Welcome to LearnEnglish Kids</h1>
            <p className="text-welcome mt-3">
              LearnEnglish Kids is brought to you by the British Council, the
              world's English teaching experts. We have lots of free online
              games, songs, stories and activities for children. For parents, we
              have articles on supporting children in learning English, videos
              on using English at home and information about{" "}
              <Link to={ROUTES.TOPIC} className="text-info">
                English courses for your child
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
