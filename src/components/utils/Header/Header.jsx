import React from 'react';
import s from './Header.module.scss'
const Header = (props) => {
    return (
        <h1 className={s.header}>
            {props.title}
        </h1>
    )
};
export default Header