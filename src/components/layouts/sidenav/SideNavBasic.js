import SideNavWithoutLogin from "./SideNavWithoutLogin";
import SideNavWithLogin from "./SideNavWithLogin";

const SideNavBasic = () => {
  return (
    <>
      <main>SideNavBasic</main>

      <SideNavWithoutLogin></SideNavWithoutLogin>
      <SideNavWithLogin></SideNavWithLogin>
    </>
  );
};

export default SideNavBasic;
