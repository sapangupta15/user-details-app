import React from "react";
import {mount} from 'enzyme';

import UserDataForm from "./UserDataForm";

describe('<UserDataForm />', () => {
    let wrapper;

    it('should disable save till inputs are entered ', function () {
        wrapper = mount(<UserDataForm />);

        expect(wrapper.find('button#submit-user').prop('disabled')).toBeTruthy();
    });

    it('should allow submit and pass form values to save function', function () {
        const saveUser = jest.fn();

        wrapper = mount(<UserDataForm saveUser={saveUser} />)

        let usernameInput = wrapper.find('input#outlined-username');
        usernameInput.simulate('change', { target: { value: 'test' } })

        let firstNameInput = wrapper.find('input#outlined-firstname');
        firstNameInput.simulate('change', { target: { value: 'test' } })

        let emailInput = wrapper.find('input#outlined-email');
        emailInput.simulate('change', { target: { value: 'test' } })

        let passwordInput = wrapper.find('input#outlined-password');
        passwordInput.simulate('change', { target: { value: 'test' } })

        wrapper.find('button#submit-user').simulate('click');

        expect(saveUser).toHaveBeenCalledWith({
            id: '',
            username: 'test',
            firstName: 'test',
            lastName: '',
            email: 'test',
            password: 'test',
            phone: '',
            userStatus: false,
            showPassword: false
        })

    });
})