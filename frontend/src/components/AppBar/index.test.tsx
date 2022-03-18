import 'jest-styled-components';
import {render} from "@testing-library/react";
import {NavBar} from "./index";

describe('NavBar', () => {
    it('renders correctly', () => {
        expect(render(<NavBar/>).asFragment()).toMatchSnapshot();
    });
});