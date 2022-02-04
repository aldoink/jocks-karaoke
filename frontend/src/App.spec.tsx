import {render} from "@testing-library/react";
import App from "./App";

describe('App', () => {
    it('renders correctly', async () => {
        expect(render(<App/>).asFragment()).toMatchSnapshot();
    });
});
