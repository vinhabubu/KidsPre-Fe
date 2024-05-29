import Footer from "components/footer";
import Header from "components/header/HeaderUser";
import { Outlet } from "react-router-dom";
// import styles
import FooterPage from "components/footer/FooterPage";
import "./layout.scss";
function UserLayout(props) {
  return (
    <>
      <div>
        <Header classHead="container" showProfile></Header>
      </div>
      <main className="w-100">
        <div className="min-h-100">
          <Outlet />
        </div>
        <FooterPage />
        <Footer />
      </main>
    </>
  );
}

export default UserLayout;
