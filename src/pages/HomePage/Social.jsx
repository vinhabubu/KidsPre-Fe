import React from "react";

const Social = () => {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center social">
      <h2 className="fw-bold text-info">KIDRPIRE</h2>
      <span className="fs-4 text text-danger">Kids Activity Programs</span>
      <div className="d-flex gap-3 mt-3">
        <div className="icon-social text-primary">
          <i className="fab fa-facebook-f"></i>
        </div>
        <div className="icon-social text-info">
          <i className="fab fa-twitter"></i>
        </div>
        <div className="icon-social text-danger">
          <i className="fab fa-google-plus-g"></i>
        </div>
      </div>
    </section>
  );
};

export default Social;
