import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container px-5 py-24 mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
