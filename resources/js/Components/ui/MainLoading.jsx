import { BlinkBlur, Slab } from "react-loading-indicators";

const MainLoading = (text) => {
    return (
        <Slab color="#a55252ff" size="large" text={text?.text || "Load Data..."} textColor="#914a4aff" />
    )
};

export default MainLoading;