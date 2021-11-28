import React from 'react';
import s from './CourseElement.module.scss'

const CourseElement = (props) => {
    return(
        <div className={s.wrapper}>
            <div className={s.container} onClick={()=>props.handleClick(props.id)}>
                <div className={s.titlecontainer}>
                    {props.title}
                </div>
                <hr className={s.line}/>
                <div className={s.author}>
                    Автор: {props.author}
                </div>
            </div>
        </div>
    )
}
export default CourseElement;