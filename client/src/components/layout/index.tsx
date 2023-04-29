import { ILayoutProps } from "@/types/common";
import Header from "../modules/Header/Header";
import Footer from "../modules/Footer/Footer";
import { useTheme } from "@/hooks/useTheme";

const Layout = ({ children }: ILayoutProps) => {
  const { theme } = useTheme();
  return (
    <>
      <Header />
      <div style={{ backgroundColor: theme === "dark" ? "#222" : "" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
