import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router';
import Button from '../../../utils/Button/Button';
import AddCourse from '../../atom/AddCourse/AddCourse';
import {SetLogOut} from '../../../../redux/reducers/AuthReducer';
import { Get_Data_Async, Add_Course_Async } from '../../../../redux/reducers/TeacherReducer'
import s from './LeftSide.module.scss'
const LeftSide = (props) => {
    const history = useHistory();
    const currentLocation = useLocation().pathname;
    let currnetTab = currentLocation.split('/')[2];
    const handleToMyCourcesClick = () => {
        props.role==="teacher" ?
        history.push(`/teacherPage/my_cources/`) :
        history.push(`/studentPage/my_cources/`) ;
    }
    const handleToAllCourcesClick = () => {
        props.role==="teacher" ?
        history.push(`/teacherPage/all_cources/`) :
        history.push(`/studentPage/all_cources/`) ;
    }
    const [isShownAddCourse, setshowAddCourse] = useState(false);
    const closeTab = () => {
        setshowAddCourse(true);
    }
    const setshowAdd = (courseName) => {
        props.Add_Course_Async(props.user_id, props.name, courseName);
        props.Get_Data_Async();
        props.role==="teacher" ?
        history.push(`/teacherPage/my_cources/`) :
        history.push(`/studentPage/my_cources/`) ;
        setshowAddCourse(false);
    }
    return (
        <>
        {!props.isAuth ? <Redirect to='/login'/> :
        <div className={s.container}>
            <div className={s.subtitle}>{props.role==='teacher'? "учитель" : "студент"}</div>
            <div className={s.header}>{props.name}</div>
            <hr />
            { props.role==='teacher' && <div className={s.but}>
                <Button className={s.buttonStyle} handleClick={closeTab} name='Создать курс' />
            </div>}
            {isShownAddCourse && (<div>
                <div className={s.blackBackground}>
                </div>
                <AddCourse onClose={setshowAddCourse} setshowAdd={setshowAdd} />
            </div>)}
            <ul>
                <li className={currnetTab === 'all_cources' ? s.active : ''} onClick={() => handleToAllCourcesClick()}>Все курсы</li>
                <li className={currnetTab === 'my_cources' ? s.active : ''} onClick={() => handleToMyCourcesClick()}>Мои курсы</li>
            </ul>
            <div className={s.logOut}>
                <Button handleClick={props.SetLogOut} name='Выйти' />
            </div>
            
        </div>
}
        </>
    )
}

const mapStateToProps = (state) => ({
    user_id: state.AuthReducer.user_id,
    isAuth: state.AuthReducer.isAuth,
    name: state.AuthReducer.name,
    role: state.AuthReducer.role
})
export default connect(mapStateToProps, {Add_Course_Async, Get_Data_Async, SetLogOut})(LeftSide);
