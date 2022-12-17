import BootstrapFooterLogo from "../../svg/bootstrap_footer_logo.svg";
import FooterMenu from "./components/footer_menu";
import { connect } from "react-redux";

function Footer(props) {
  console.log(">> FOOTER PROPS", props);

 

  const aboutUsMenuContent = [
    {
      title: "Biz Kimiz",
      link: "#/about/who-we-are",
    },
    {
      title: "Vizyon",
      link: "#/about/vision",
    },
    {
      title: "Misyon",
      link: "#/about/mission",
    },
    {
      title: "İletişim",
      link: "#/about/contact",
    },
  ];

  const blogsMenuContent = [
    {
      title: "Badana",
      link: "#/blogs/badana",
    },
    {
      title: "Dış Cephe",
      link: "#/blogs/dış-cephe-sıva",
    },
    {
      title: "Elektrik/Elektronik",
      link: "#/blogs/elektrik-elektronik",
    },
  ];

  const categoryMenu = []
  if (props.categoriesState.initialized === true){
    props.categoriesState.categories.map((item, index)=> {

      if (index > 4 ){
        return

      }

      const menuItem = {
        title: item.name,
        link: "#/category/" + item.slug,
      }
      categoryMenu.push(menuItem)
      
    })
  }
  console.log('>>CATEGORY MENU', categoryMenu)

  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <img
            className="mb-2"
            src={BootstrapFooterLogo}
            alt=""
            width="24"
            height="19"
          />
          <small className="d-block mb-3 text-muted">© 2017–2021</small>
        </div>

        <FooterMenu title="Hakkımızda" menu={aboutUsMenuContent} />
        <FooterMenu title="Kategoriler" menu={categoryMenu} loading={!props.categoriesState.initialized} />
        <FooterMenu title="Bloglar" menu={blogsMenuContent} />
      </div>
    </footer>
  );
}

const mapStateToProps = (state) => {
  console.log(">>MAP STATE", state);
  return {
    categoriesState: state.categoriesState,
  };
};

export default connect(mapStateToProps)(Footer);
