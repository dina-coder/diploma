import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../utils/Button/Button';
import s from './LogIn.module.scss';
import {login} from '../../redux/reducers/AuthReducer'
import { Redirect } from 'react-router-dom';

const LogIn = (props) => {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    
    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    if (props.role === 'teacher'){return <Redirect to={'/teacherPage'}/>}
    if (props.role === 'student'){return <Redirect to={'/studentPage'}/>}

    console.log(props.isError)

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
            <div className={s.top}></div>
            <div className={s.bottom}></div>
            <div className={s.center}>
                <h2 className={s.title}>Авторизация</h2>
                {props.isError && <div className={s.error}>Неверный логин или пароль</div>}
                <div>
                    <input onChange={onChangeEmail} placeholder={'Логин'} className={s.input} type="email"></input>
                </div>
                <div>
                    <input onChange={onChangePassword} placeholder={'Пароль'} className={s.input} type={"password"}></input>
                </div>
                <div className={s.button_container}>
                    <Button handleClick={props.login.bind(null, email, password)} className={s.add_button} name={"войти"}/>
                </div>
            </div>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    role:state.AuthReducer.role,
    isError:state.AuthReducer.isError
})

export default connect(mapStateToProps, {login})(LogIn) ;