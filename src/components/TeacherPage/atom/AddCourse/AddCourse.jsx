import React, { useEffect, useState } from 'react';
import s from './AddCourse.module.scss'

const AddCourse = (props) => {
    const [section, setSection] = useState("");
    return (
        <div className={s.container}>
            <div className={s.title}>Добавить курс
            <span onClick={()=>props.onClose(false)} className={s.plus + " " + s.rotate}></span>
            </div>
            <textarea onChange={(e) => setSection(e.currentTarget.value)} value={section} className={s.textarea_add} />
            <div className={s.add_button_container}>
                <button onClick={() => props.setshowAdd(section)} className={s.add_button}>Сохранить</button>
            </div>
        </div>
    )
}
export default AddCourse;