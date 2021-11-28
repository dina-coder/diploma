import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Get_Data_Async, UpdateCourse } from '../../../../redux/reducers/TeacherReducer'
import { connect } from 'react-redux';
import s from './CoursePageWorkSpace.module.scss';
import TaskElement from '../../molecule/TaskElement/TaskElement';

const CoursePageWorkSpace = (props) => {
  const location = useLocation();
  const course = props.cources.filter(x => x._id === location.pathname.split('/')[
    location.pathname.split('/').length - 2])[0];
  const courseSection = course.children.filter(x => x._id == location.pathname.split('/').pop())[0]
  const [section, setSection] = useState(courseSection.name)
  const [task, setTask] = useState(courseSection.children)

  const postCourse = () => {
    let resCourse = course;
    for (let i=0; i<resCourse.children.length; i++){
      if (resCourse.children[i]._id===courseSection._id){
        resCourse.children[i].name = section;
        resCourse.children[i].children=task;

      }
    }
    props.UpdateCourse(resCourse._id, resCourse);
  }

  useEffect(() => {
    props.Get_Data_Async()
  }, [])
  
  let AllTasks =  task.map(el => <TaskElement key = {el._id} id={el._id} task={task}
    setTask={setTask} variants ={el.variants} question={el.question} answear = {el.answear} theory={el.theory} type={el.type}/>)

  return (
    <div className={s.container}>
      <div className={s.topContainer}>
          <textarea className={s.titleInput} onChange={(e)=>setSection(e.currentTarget.value)} 
              value={section}/>
          <div className={s.saveButtonContainer}>
            <button onClick ={()=>postCourse()} className={s.saveButton}>Сохранить</button>
          </div>
      </div>

      <div className={s.task_container}>
        {AllTasks}
        <div onClick={()=>setTask([...task, {
            _id: task.length>0 ? task[task.length-1]._id+"1" : "1",
            name: "",
            type: "ВЫБОР_ОДИН",
            question: "",
            variants: [],
            answear: [],
            theory: ""
        }])} className={s.addButton}>
          + добавить вопрос
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  cources: state.TeacherReducer.cources
})
export default connect(mapStateToProps, { Get_Data_Async, UpdateCourse })(CoursePageWorkSpace);