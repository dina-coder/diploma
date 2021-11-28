import React, { useEffect, useState, useRef } from 'react';
import deleteicon from '../../../sources/delete.png';
import Checkbox from '../../atom/Checkbox/Checkbox';
import Question_Answear from '../../atom/Question_Answear/Question_Answear';
import Radiobutton from '../../atom/Radiobutton/Radiobutton';
import s from './TaskElement.module.scss';
const TaskElement = (props) => {
    const [question, setQuestion] = useState(props.question)
    const [answear, setAnswear] = useState(props.answear)
    const [theory, setTheory] = useState(props.theory)
    const [type, setType] = useState(props.type)
    const [variants, setVariants] = useState(props.variants)
    const [istheory, showTheory] = useState(false)

    let changedTasks = props.task;
    let changedInd = -1;
    for (let i = 0; i < props.task.length; i++) {
        if (props.task[i]._id == props.id) {
            changedInd = i;
        }
    }

    useEffect(() => {
        if (changedInd !== -1) {
            changedTasks = [...props.task].slice(0, changedInd)
            changedTasks.push({
                _id: props.id,
                question: question,
                answear: answear,
                theory: theory,
                type: type,
                variants: variants,
            })
            changedTasks.push(...[...props.task].slice(changedInd + 1, props.task.length))
        }
        props.setTask(changedTasks)
    }, [question, answear, theory, type, variants, props.id])
    let selectRef = useRef();
    const delTask = (id) => {
        const currentTasks = props.task.filter(el => el._id !== id)
        props.setTask([...currentTasks])
    }
    return (
        <div className={s.wrapper}>
            <div onClick={() => delTask(props.id)} className={s.icon_container}>
                <img src={deleteicon} />
            </div>
            <div className={s.selector_container}>
                <span>Тип вопроса:</span>
                <select ref={selectRef} onChange={() => setType(selectRef.current.value)} className={s.selector}>
                    <option selected={type === "ВОПРОС_ОТВЕТ" ? true : false} value="ВОПРОС_ОТВЕТ">Вопрос-ответ</option>
                    <option selected={type === "ВЫБОР_ОДИН" ? true : false} value="ВЫБОР_ОДИН">Один из списка</option>
                    <option selected={type === "ВЫБОР_НЕСКОЛЬКО" ? true : false} value="ВЫБОР_НЕСКОЛЬКО">Несколько из списка</option>
                </select>
            </div>
            <div className={s.theory_container}>
                <span className={s.theory_title} onClick={() => showTheory(istheory === true ? false : true)}>Teория</span>
                {istheory && <textarea onChange={(e) => setTheory(e.currentTarget.value)} value={theory} />}
            </div>
            {type === "ВОПРОС_ОТВЕТ" &&
                <Question_Answear setQuestion={setQuestion} setAnswear={setAnswear} question={question} answear={answear} />
            }
            {type === "ВЫБОР_ОДИН" &&
                <Radiobutton variants={variants} setAnswear={setAnswear} setVariants={setVariants} answear={answear} question={question} setQuestion={setQuestion} />
            }
            {type === "ВЫБОР_НЕСКОЛЬКО" &&
                <Checkbox variants={variants} setAnswear={setAnswear} setVariants={setVariants} answear={answear} question={question} setQuestion={setQuestion} />

            }
        </div>
    )
}
export default TaskElement;