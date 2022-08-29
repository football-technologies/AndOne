import WithLogin from "@/components/layouts/SideNav/WithLogin";
import WithoutLogin from "@/components/layouts/SideNav/WithoutLogin";

const SideNavBase = () => {
  return (
    <>
      <h1>Sidenav Base</h1>
      <WithoutLogin></WithoutLogin>
    </>
  );
};

export default SideNavBase;
