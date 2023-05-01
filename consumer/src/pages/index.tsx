import dynamic from "next/dynamic";
import { ComponentType, ReactElement, useState } from "react";

// TODO: Remove core code from index
// TODO: Adjust the conditional to show MFE's

type ReactComponent<P> = ComponentType<P> | ((props: P) => ReactElement | null);


let Header: ReactComponent<{}> = () => null;
let Menu: ReactComponent<{}> = () => null;

try {
  Menu = dynamic(
    () => import("menu/component/Menu").then((m) => m.Menu),
    {
      ssr: false,
    }
  );
} catch (error) {
  console.error("Occured and error to import component Footer", error);
}

const Loading = () => <div>Loading...</div>;

export default function Home() {
  const [, setHeaderLoaded] = useState(false);
  const [, setMenuLoaded] = useState(false);

  try {
    Header = dynamic(
      () =>
        import("header/component/Header")
          .then((m) => {
            setHeaderLoaded(true);
            return m.Header;
          })
          .catch(() => {
            setHeaderLoaded(true);
            // eslint-disable-next-line react/display-name
            return () => <div>Failed to load Header</div>;
          }),
      { ssr: false }
    );
  } catch (error) {
    console.error("Occured and error to import component Header", error);
  }

  try {
    Menu = dynamic(
      () =>
        import("menu/component/Menu")
          .then((m) => {
            setMenuLoaded(true);
            return m.Menu;
          })
          .catch(() => {
            setMenuLoaded(true);
            // eslint-disable-next-line react/display-name
            return () => <div>Failed to load Menu</div>;
          }),
      { ssr: false }
    );
  } catch (error) {
    console.error("Occured and error to import component Dashboard", error);
  }

  return (
    <>
      <Header />
      <div style={{paddingTop:'80px'}}>
        <Menu/>
      </div>
      <br />
      <h1 style={{paddingTop: '100px'}}>I'm the shell running on port 3000 and consuming this two applications</h1>
    </>
  );
}
