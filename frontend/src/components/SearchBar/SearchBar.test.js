import React from "react";
import SearchBar from "./SearchBar";
import {mount} from 'enzyme';

describe('<SearchBar />', () => {
    let wrapper;

    it('should call search function when search is clicked', function () {
        const handleSearch = jest.fn();
        wrapper = mount(<SearchBar handleSearch={handleSearch} />);
        let input = wrapper.find('input#search-box');
        input.simulate('change', { target: { value: 'Hello' } })

        wrapper.find('button').simulate('click');

        expect(handleSearch).toHaveBeenCalledWith('Hello');

    });
})