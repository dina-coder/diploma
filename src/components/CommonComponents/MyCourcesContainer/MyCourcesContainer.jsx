import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import s from './MyCourcesContainer.module.scss';
import { Get_Data_Async } from '../../../redux/reducers/TeacherReducer'
import { connect } from 'react-redux';
import Header from '../../utils/Header/Header';
import CourseElement from '../../TeacherPage/molecule/CourseElement/CourseElement';


const MyCourcesContainer = (props) => {
    const history = useHistory();
    const handleTeacherClick = (id) => {
        history.push(`/teacherPage/my_cources/${id}`);
    }
    const handleStudentClick = (id) => {
        history.push(`/studentPage/my_cources/${id}`);
    }
    useEffect(() => {
        props.Get_Data_Async()
    }, [])


    let AllObjectList = [];
    if (props.role === 'teacher') {
        const activeCources = props.cources.filter(el => el.teacher_id == props.user_id);
        if (activeCources) AllObjectList = activeCources.map(x => <CourseElement isAuthor={x.teacher_id === props.user_id} handleClick={handleTeacherClick} id={x._id} author={x.author} title={x.name} />)

    }
    else {
        const activeCources = props.cources.filter(el => el.student_id.includes(props.user_id));
        if (activeCources) AllObjectList = activeCources.map(x => <CourseElement isAuthor={x.teacher_id === props.user_id} handleClick={handleStudentClick} id={x._id} author={x.author} title={x.name} />)
    }
    return (
        <div className={s.wrapper}>
            <Header title={"Мои курсы"} />
            <div className={s.container}>
                {AllObjectList}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    cources: state.TeacherReducer.cources,
    user_id: state.AuthReducer.user_id,
    role: state.AuthReducer.role,
    isAuth: state.AuthReducer.isAuth
})
export default connect(mapStateToProps, { Get_Data_Async })(MyCourcesContainer);