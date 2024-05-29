import ContentLesson from "./ContentLesson";
import ContentQuiz from "./ContentQuiz";
import Slider from "./Slider";
import Social from "./Social";
import Welcome from "./Welcome";
import "./homepage.scss";

function HomePage(props) {
  return (
    <>
      <Slider />
      <Welcome />
      <ContentLesson />
      <ContentQuiz />
      <Social />
    </>
  );
}

export default HomePage;
