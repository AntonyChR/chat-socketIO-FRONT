import {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import validateEmail from '../helpers/validateEmail';

export const LoginPage = () => {
    const { login } = useContext(AuthContext);

    const [ form, setForm ] = useState({
        email:'',
        password: '',
        rememberme: false
    });

    useEffect(()=>{
        const memorizedEmail = localStorage.getItem('email');
        if(memorizedEmail){
            setForm(( form )=>({
                ...form,
                email: memorizedEmail,
                rememberme: true
            }));
        }
    }, []);

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]:value
        });
    }

    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        (form.rememberme)?
            localStorage.setItem('email', form.email)
            :
            localStorage.removeItem('email');
        const {email, password} = form;
        const ok = await login(email, password);
        if(!ok){
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión', 
                text: 'Credenciales incorrectas'
            });
        }
    }

    const validateInput = () => {
        return ( validateEmail(form.email) && form.password.length > 0 ) ?
            true
            :
            false
    }

    return (
        <form onSubmit = {onSubmit} className='login100-form validate-form flex-sb flex-w'>
            <span className='login100-form-title mb-3'>Chat</span>

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
                <div className='col' onClick = {()=>toggleCheck()}>
                    <input
                        className='input-checkbox100'
                        id='ckb1'
                        type='checkbox'
                        name='rememberme'
                        checked = {form.rememberme}
                        readOnly
                    />
                    <label className='label-checkbox100'>Recordarme</label>
                </div>

                <div className='col text-right'>
                    <Link to='/auth/register' className='txt1'>
                        Crear una cuenta
                    </Link>
                </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
                <button disabled={!validateInput()} type='submit' className='login100-form-btn'>Ingresar</button>
            </div>
        </form>
    );
};
