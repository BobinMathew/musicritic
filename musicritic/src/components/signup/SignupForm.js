/* @flow */

import React from 'react';
import { Form, Button } from 'reactstrap';
import Yup from 'yup';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';

import { createUser } from '../../api/UserAPI';
import FormField from '../common/form/FormField';
import {
    usernameValidator,
    emailValidator,
    passwordValidator,
    passwordConfirmationValidator,
} from '../common/validator/UserValidator';

type Props = {
    touched: any,
    errors: any,
    values: any,
    handleChange: () => void,
    isSubmitting: boolean,
    handleSubmit: () => void,
};

const SignupForm = ({
    touched,
    errors,
    values,
    handleChange,
    isSubmitting,
    handleSubmit,
}: Props) => (
    <Form onSubmit={handleSubmit}>
        <FormField
            name="username"
            label="Username"
            placeholder="Username"
            errors={errors.username}
            touched={touched.username}
            value={values.username}
            onChange={handleChange}
        />
        <FormField
            name="email"
            label="Email"
            placeholder="name@example.com"
            errors={errors.email}
            touched={touched.email}
            value={values.email}
            onChange={handleChange}
        />
        <FormField
            name="password"
            label="Password"
            placeholder="Password"
            errors={errors.password}
            touched={touched.password}
            value={values.password}
            onChange={handleChange}
            type="password"
        />
        <FormField
            name="passwordConfirm"
            label="Confirm password"
            placeholder="Repeat password"
            errors={errors.passwordConfirm}
            touched={touched.passwordConfirm}
            value={values.passwordConfirm}
            onChange={handleChange}
            type="password"
        />
        <Button type="submit" disabled={isSubmitting} block>
            Sign up for Musicritic
        </Button>
    </Form>
);

export default withFormik({
    mapPropsToValues: () => ({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }),
    validationSchema: Yup.object().shape({
        username: usernameValidator(),
        email: emailValidator(),
        password: passwordValidator(),
        passwordConfirm: passwordConfirmationValidator(Yup.ref('password')),
    }),
    handleSubmit: (values, { setSubmitting }) => {
        createUser(values)
            .then(() => {
                setSubmitting(false);
                toast.success('User successfully created!');
            })
            .catch(error => {
                setSubmitting(false);
                toast.error(error.message);
            });
    },
})(SignupForm);
