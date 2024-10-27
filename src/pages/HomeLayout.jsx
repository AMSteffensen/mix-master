import { NavLink, Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isPageLoading = navigation.state === "loading";
  const value = "some value";
  return (
    <div>
      <NavBar />
      <section className="page">
        {isPageLoading ? (
          <div className="loading"></div>
        ) : (
          <Outlet context={{ value }} />
        )}
      </section>
    </div>
  );
};

export default HomeLayout;
