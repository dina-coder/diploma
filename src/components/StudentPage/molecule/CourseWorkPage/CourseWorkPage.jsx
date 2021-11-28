import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Get_Data_Async, UpdateCourse } from '../../../../redux/reducers/TeacherReducer'
import { Set_Progress_Async, Get_Progress_Async } from '../../../../redux/reducers/AuthReducer'
import { connect } from 'react-redux';
import s from './CourseWorkPage.module.scss';
import Radiobutton from '../../../CommonComponents/atom/Radiobutton/Radiobutton';
import Question_Answear from '../../../CommonComponents/atom/Question_Answear/Question_Answear';
import Checkbox from '../../../CommonComponents/atom/Checkbox/Checkbox';
import Button from '../../../utils/Button/Button';
import Theory from '../../../CommonComponents/atom/Theory/Theory';



const CourseWorkPage = (props) => {
    const location = useLocation();
    const course = props.cources.filter(x => x._id === location.pathname.split('/')[
        location.pathname.split('/').length - 2])[0];
    const courseSection = course.children.filter(x => x._id == location.pathname.split('/').pop())[0]
    const [tasks, setTasks] = useState(courseSection.children)
    const [task, setTask] = useState(null);
    const [curAnswear, setCurAnswear] = useState([]);
    const [newTask, getNewTask] = useState(false);
    const [showTheory, setshowTheory] = useState(false);
    //находим текущее задание
    const getTask = () => {
        setCurAnswear([]);
        for (let i = 0; i < props.progress.length; i++) {
            if (props.progress[i]._id === course._id) {
                for (let j = 0; j < props.progress[i].progress.length; j++) {
                    if (props.progress[i].progress[j]._id === courseSection._id) {
                        let curTask = props.progress[i].progress[j].progress.filter(el => el.status === false)[0];
                        curTask && setTask(tasks.filter(el => el._id === curTask._id)[0]);
                    }
                }
            }
        }
    }
    const setNewAnswear = () => {
        let currprog = props.progress;
        let status = true;
        if (curAnswear.length === task.answear.length) {
            if (curAnswear.sort().join(" ") !== task.answear.sort().join(" ")) {
                status = false;
            }
        }
        else {
            status = false;
        }
        if (status) {
            for (let i = 0; i < currprog.length; i++) {
                if (currprog[i]._id === course._id) {
                    for (let j = 0; j < currprog[i].progress.length; j++) {
                        if (currprog[i].progress[j]._id === courseSection._id) {
                            for (let k = 0; k < currprog[i].progress[j].progress.length; k++) {
                                if (task._id === currprog[i].progress[j].progress[k]._id) {
                                    currprog[i].progress[j].progress[k].status = true;
                                }
                            }
                        }
                    }
                }
            }
            props.Set_Progress_Async(props.user_id, currprog);
            getNewTask(!newTask)
            setTask(null);
        }
        else {
            setshowTheory(true);
        }
    }
    useEffect(() => {
        props.Get_Data_Async();
    }, [])
    useEffect(() => {
        getTask();
    }, [task, newTask])
    return (
        <div className={s.wrapper}>
            {showTheory && (
                <div>
                <div className={s.blackBackground}></div>
                <Theory theory={task.theory} onClose={setshowTheory} />
                </div>)}

                    {
                        task ? (
                            <div className={s.container}>
                                {task.type === "ВОПРОС_ОТВЕТ" &&
                                    <Question_Answear setCurAnswear={setCurAnswear} question={task.question} answear={task.answear} />}
                                {task.type === "ВЫБОР_ОДИН" &&
                                    <Radiobutton curAnswear={curAnswear} setCurAnswear={setCurAnswear} variants={task.variants} question={task.question} />}

                                {task.type === "ВЫБОР_НЕСКОЛЬКО" &&
                                    <Checkbox curAnswear={curAnswear} setCurAnswear={setCurAnswear} variants={task.variants} question={task.question} />}
                                <div className={s.saveButtonContainer}>
                                    <button onClick={() => setNewAnswear()} className={s.saveButton}>Отправить</button>
                                </div>
                            </div>) :
                            <div className={s.title}>Поздравляю, вы прошли этот раздел!</div>
                    }
                </div>
            )
            }
const mapStateToProps = (state) => ({
                cources: state.TeacherReducer.cources,
    user_id: state.AuthReducer.user_id,
    progress: state.AuthReducer.progress
})
export default connect(mapStateToProps, { Get_Data_Async, UpdateCourse, Set_Progress_Async, Get_Progress_Async})(CourseWorkPage);