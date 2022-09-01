import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <header id="ftHeader">
        <SideNavBasic></SideNavBasic>
      </header>

      <article id="ftMain">
        <main id="ftMainContainer">{children}</main>
      </article>
    </>
  );
};

export default DefaultLayout;
