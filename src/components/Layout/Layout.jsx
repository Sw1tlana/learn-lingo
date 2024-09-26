import AppBar from "../AppBar/AppBar";
import Container from "../../shared/components/Container/Container";

const Layout = ({ children }) => {
    return (
        <Container>
            <AppBar/>
            <main>{children}</main>
        </Container>
    )
};

export default Layout;
