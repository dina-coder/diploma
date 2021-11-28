import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CourseElement from '../../molecule/CourseElement/CourseElement';
import s from './MainContainer.module.scss';
import { Get_Data_Async } from '../../../../redux/reducers/TeacherReducer'
import { connect } from 'react-redux';
import Header from '../../../utils/Header/Header';

const MainContainer = (props) => {
    const history = useHistory();
    const handleClick = (id) => {
        history.push(`/teacherPage/my_cources/${id}`);
    }
    useEffect(() => {
        props.Get_Data_Async()
      }, [])


    let AllObjectList=[];
    if (props.cources) AllObjectList=props.cources.map(x=><CourseElement isAuthor={x.teacher_id===props.user_id} handleClick={handleClick} id={x._id} author={x.author}title={x.name}/>)
    return(
        <div className={s.wrapper}>
            <Header title={"Все курсы"}/>
            <div className={s.container}>
                {AllObjectList}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    cources: state.TeacherReducer.cources,
    user_id: state.AuthReducer.user_id,
  })
export default  connect(mapStateToProps, { Get_Data_Async })(MainContainer);