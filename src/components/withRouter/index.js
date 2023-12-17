import { useNavigate, BrowserRouter } from "react-router-dom";

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        return (
            <BrowserRouter>
                <Component
                    navigate={navigate}
                    {...props}
                />
            </BrowserRouter>
        );
    };

    return Wrapper;
};