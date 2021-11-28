import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import MyCourcesContainer from "../CommonComponents/MyCourcesContainer/MyCourcesContainer"
import AllCoursesStudent from "../StudentPage/container/AllCourses/AllCoursesStudent"
import CourseWorkPage from "../StudentPage/molecule/CourseWorkPage/CourseWorkPage"
import CoursePage from "../StudentPage/organism/CoursePage/CoursePage"
import LeftSide from "../TeacherPage/organism/LeftSide/LeftSide"

const Student = () => {
    const pathname = useLocation()
    if (pathname.pathname === '/studentPage'){return <Redirect to={'/studentPage/all_cources'}/>}
    return (
        <div style={{display:'flex'}}>
            <LeftSide />
            <Switch>
                <Route path={'/studentPage/my_cources/:id_subject/:id_element'} component={CourseWorkPage}/>
                <Route path={'/studentPage/my_cources/:id_subject'} component={CoursePage}/>
                <Route path={'/studentPage/all_cources'} component={AllCoursesStudent}/>
                <Route path={'/studentPage/my_cources'} component={MyCourcesContainer}/>
            </Switch>

        </div>
    )
}
export default Student;