import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Get_Data_Async, UpdateCourse, Delete_Course_Async } from '../../../../redux/reducers/TeacherReducer'
import { connect } from 'react-redux';
import s from './CoursePage.module.scss';
import Header from '../../../utils/Header/Header';
import { useHistory } from 'react-router-dom';
import AddSection from '../../atom/AddSection/AddSection';
import deleteicon from '../../../sources/delete.png'
import Button from '../../../utils/Button/Button';

const CoursePage = (props) => {
    const [showAdd, setshowAdd] = useState(false);
    const history = useHistory();
    useEffect(() => {
        props.Get_Data_Async()
    }, [props.cources])
    const location = useLocation()
    const handleClick = (id) => {
        history.push(`/teacherPage/my_cources/${location.pathname.split('/').pop()}/${id}`);
    }
    const [course, setCourse] = useState(props.cources.filter(x => x._id == location.pathname.split('/').pop())[0])
    const deleteSection = (id) => {
        const courseElement = course.children.filter(el => el._id !== id);
        let res = course;
        res.children = courseElement;
        props.UpdateCourse(res._id, res);
    }
    const setSection = (name) => {
        setshowAdd(false);
        let res = course;
        res.children.push({
            _id: course.children.length > 0 ? course.children[course.children.length - 1]._id + "1" : "1",
            name: name,
            children: []
        })
        props.UpdateCourse(res._id, res);

    }
    const deleteCourse = () => {
        props.Delete_Course_Async(course._id);
        history.push('/teacherPage/my_cources/');
        props.Get_Data_Async();

    }
    const isAuthor = course.teacher_id === props.user_id;
    let AllObjectList = [];
    if (course) AllObjectList = course.children.map(el => <li><span onClick={() => isAuthor && handleClick(el._id)}>{el.name}</span>
        {isAuthor && <img onClick={() => { deleteSection(el._id) }} src={deleteicon} />}</li>)
    return (
        <div className={s.container}>
            <div className={s.header}>
                <Header title={props.cources.filter(x => x._id == location.pathname.split('/').pop())[0].name} />
                {props.user_id === course.teacher_id && (<div className={s.saveButtonContainer}>
                    <button onClick={() => deleteCourse()} className={s.saveButton}>Удалить курс</button>
                </div>)}
            </div>
            <ul>
                {AllObjectList}
            </ul>
            {isAuthor && !showAdd && <div onClick={() => setshowAdd(true)} className={s.addButton}>
                +добавить раздел</div>}
            {isAuthor && showAdd && <AddSection onClose={setshowAdd} setshowAdd={setSection} />}
        </div>
    )
}
const mapStateToProps = (state) => ({
    cources: state.TeacherReducer.cources,
    user_id: state.AuthReducer.user_id
})
export default connect(mapStateToProps, { Get_Data_Async, UpdateCourse, Delete_Course_Async })(CoursePage);