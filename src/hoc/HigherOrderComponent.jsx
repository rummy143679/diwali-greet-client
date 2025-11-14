import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";

function HOC(WrapperComponent) {
  return function InnerComponent() {
    return (
      <>
        <HeaderComponent></HeaderComponent>
        {<WrapperComponent />}
        <FooterComponent></FooterComponent>
      </>
    );
  };
}

export default HOC;
