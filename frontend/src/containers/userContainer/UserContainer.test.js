import React from 'react';
import UserContainer from "./UserContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserDataTable from "../../components/UserTable/UserTable";
import UserDataModal from "../../components/UserModal/UserModal";
import {mount, shallow} from 'enzyme';

describe('<UserContainer/>', () => {
    let wrapper;

    it('should check if all components are included', function () {
        wrapper = shallow(<UserContainer />);
        expect(wrapper.find(SearchBar)).toHaveLength(1);
        expect(wrapper.find(UserDataModal)).toHaveLength(1);
        expect(wrapper.find(UserDataTable)).toHaveLength(1);
    });

    it('should open modal when add user is clicked', function () {
        wrapper = mount(<UserContainer />);
        wrapper.find('button#add-user').simulate('click');

        expect(wrapper.find('input#outlined-email')).toHaveLength(1);
    });

    // TODO - add test cases for server interactions interactions using mock axios adapter

})