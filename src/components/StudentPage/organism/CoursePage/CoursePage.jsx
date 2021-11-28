import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Get_Data_Async, UpdateCourse } from '../../../../redux/reducers/TeacherReducer'
import { Set_Progress_Async, Get_Progress_Async } from '../../../../redux/reducers/AuthReducer'
import { connect } from 'react-redux';
import s from './CoursePage.module.scss';
import Header from '../../../utils/Header/Header';
import { useHistory } from 'react-router-dom';


const CoursePage = (props) => {
    const [progress, setProgress] = useState(props.progress);
    const history = useHistory();
    useEffect(() => {
        props.Get_Data_Async();
        props.Get_Progress_Async(props.user_id);
    }, [progress])
    const location = useLocation()
    const handleClick = (id) => {
        history.push(`/studentPage/my_cources/${location.pathname.split('/').pop()}/${id}`);
    }
    const [course, setCourse] = useState(props.cources.filter(x => x._id == location.pathname.split('/').pop())[0]);
    const subscribeCourse = () => {
        let updatedCourse = course;
        updatedCourse.student_id.push(props.user_id);
        setCourse(updatedCourse);
        let curprogress = {
            _id: course._id,
            status: false,
            progress: []
        };
        for (let i=0; i<course.children.length; i++){
            let sec_id = curprogress.progress.length;
            curprogress.progress.push({
                _id: course.children[i]._id,
                status: false,
                progress: []
            });
            for (let j=0; j<course.children[i].children.length; j++){
                curprogress.progress[sec_id].progress.push({
                    _id: course.children[i].children[j]._id,
                    status: false
                })
            }
        };
        props.UpdateCourse(updatedCourse._id, updatedCourse);
        props.Set_Progress_Async(props.user_id, [...props.progress, curprogress]);
        setProgress([...props.progress, progress]);
    };
    let AllObjectList = [];
    if (course) AllObjectList = course.children.map(el => <li>
        <span onClick={() => course.student_id.includes(props.user_id) ?
            handleClick(el._id) : alert('Подпишитесь, чтобы пройти курс')}>
            {el.name}
        </span>
    </li>)
    return (
        <div className={s.container}>
            <div className={s.header}>
                <Header title={props.cources.filter(x => x._id == location.pathname.split('/').pop())[0].name} />
                {
                    !course.student_id.includes(props.user_id) && <div className={s.saveButtonContainer}>
                        <button onClick={() => subscribeCourse()} className={s.saveButton}>Подписаться на курс</button>
                    </div>
                }
            </div>
            <ul>
                {AllObjectList}
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => ({
    cources: state.TeacherReducer.cources,
    user_id: state.AuthReducer.user_id,
    progress: state.AuthReducer.progress
})
export default connect(mapStateToProps, { Get_Data_Async, UpdateCourse, Set_Progress_Async, Get_Progress_Async})(CoursePage);