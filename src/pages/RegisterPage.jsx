import {useContext, useState} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import validateEmail from "../helpers/validateEmail";

export const RegisterPage = () => {

    const {register} = useContext(AuthContext);
    const [ form, setForm ] = useState({
        name: 'testUser',
        email: 'test@test.com',
        password: '123456',
    })

    const onChange = ({target}) => {
        const {name, value} = target;
        setForm({
            ...form,
            [name]: value
        });

    }

    const validateInput = () => {
        if(validateEmail(form.email) && form.name.length>0 && form.password.length > 0){
            return true;
        }
        return false;

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const {email, password, name} = form;
        const ok = await register(email, password, name);
        if(!ok){
            Swal.fire('Error','Error al crear usuario', 'error');
        }

    }
    return (
        <form onSubmit = {onSubmit} className='login100-form validate-form flex-sb flex-w'>
            <span className='login100-form-title mb-3'>Registro</span>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='text'
                    name='name'
                    placeholder='Nombre'
                    value = {form.name}
                    onChange = {onChange}
                />
                <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='email'
                    name='email'
                    placeholder='Email'
                    value = {form.email}
                    onChange = {onChange}
                />
                <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value = {form.password}
                    onChange = {onChange}
                />
                <span className='focus-input100'></span>
            </div>

            <div className='row mb-3'>
                <div className='col text-right'>
                    <Link to='login.html' className='txt1'>
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
                <button type='submit' disabled={!validateInput()} className='login100-form-btn'>Crear cuenta</button>
            </div>
        </form>
    );
};
