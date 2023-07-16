import Footer from "../../components/Footer/footer";
import NavInterface from "../../components/NavInterface/navInterface";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="content">
        <NavInterface children={undefined} />
      </div>
      <Footer />
    </div>
  );
}
