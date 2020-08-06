import React from 'react';
import UserTable from "./UserTable";
import {mount} from 'enzyme';


describe('<UserTable />', () => {
    let wrapper;
    let testData;

    beforeEach(() => {
        testData = [{
            id: 88,
            username: "uname-88",
            firstName: "firstName=88",
            userStatus: "N"
        }];
    })

    it('iterates over user data and creates rows', function () {
        testData.push({
            id: 89,
            username: "uname-89",
            firstName: "firstName=89",
            userStatus: "N"
        });
        wrapper = mount(<UserTable data={testData} />);
        expect(wrapper.find('tbody tr')).toHaveLength(2);
        // find(<TableBody />)).toHaveLength(1);
    });

    it('should call edit function on edit button click', function () {
        const handleEdit = jest.fn();
        const dataId = testData[0].id
        wrapper = mount(<UserTable data={testData} handleEdit={handleEdit} />);
        wrapper
            .find('button#edit-'+ dataId)
            .simulate('click')
        expect(handleEdit).toHaveBeenCalled();
    });

    it('should call delete function on delete button click and user clicks ok on warning', function () {
        window.confirm = jest.fn(() => true);
        const handleDelete = jest.fn();
        const dataId = testData[0].id
        wrapper = mount(<UserTable data={testData} handleDelete={handleDelete} />);
        wrapper
            .find('button#delete-'+ dataId)
            .simulate('click')
        expect(handleDelete).toHaveBeenCalled();
    });

    it('should not call delete on delete button click if user cancels on warning', function () {
        window.confirm = jest.fn(() => false);
        const handleDelete = jest.fn();
        const dataId = testData[0].id
        wrapper = mount(<UserTable data={testData} handleDelete={handleDelete} />);
        wrapper
            .find('button#delete-'+ dataId)
            .simulate('click')
        expect(handleDelete).not.toHaveBeenCalled()
    });

});