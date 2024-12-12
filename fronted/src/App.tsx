import Form from "./components/Form/Form.tsx";
import List from "./components/List/List.tsx";
import {Container} from "@mui/material";

const App = () => {
    return (
        <>
            <header></header>
            <main>
                <Container>
                    <Form/>
                    <List/>
                </Container>
            </main>
        </>
    );
};

export default App;
