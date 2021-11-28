import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import MyCourcesContainer from "../CommonComponents/MyCourcesContainer/MyCourcesContainer"
import CoursePage from "../TeacherPage/organism/CoursePage/CoursePage"
import CoursePageWorkSpace from "../TeacherPage/organism/CoursePageWorkSpace/CoursePageWorkSpace"
import LeftSide from "../TeacherPage/organism/LeftSide/LeftSide"
import MainContainer from "../TeacherPage/organism/MainContainer/MainContainer"

const Teacher = () => {
    const pathname = useLocation()
    if (pathname.pathname === '/teacherPage'){return <Redirect to={'/teacherPage/all_cources'}/>}
    return (
        <div style={{display:'flex'}}>
            <LeftSide />
            <Switch>
                <Route path={'/teacherPage/my_cources/:id_subject/:id_element'} component={CoursePageWorkSpace}/>
                <Route path={'/teacherPage/my_cources/:id_subject'} component={CoursePage}/>
                <Route path={'/teacherPage/all_cources'} component={MainContainer}/>
                <Route path={'/teacherPage/my_cources'} component={MyCourcesContainer}/>
            </Switch>

        </div>
    )
}
export default Teacher;