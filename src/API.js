import * as axios from 'axios';

export const MainAPI = {
  login(email, password) {
    let body = {
      email: email,
      password: password
    }

    return axios.post(`http://localhost:3000/signin`, body)
      .then(response => {
        return response.data
      })
  },
  updateCourse(id, course) {
    return axios.put(`http://localhost:3000/course`, { course })
      .then(response => { return response.data })
  },
  getCources() {
    return axios.get(`http://localhost:3000/allcourses`)
      .then(response => { return response.data })
  },
  getProgress(_id) {
    return axios.get(`http://localhost:3000/getprogress/${_id}`)
      .then(response => { return response.data })
  },
  addCourse(user_id, author, name) {
    return axios.post(`http://localhost:3000/addCourse`, {
      id: user_id,
      author: author,
      name: name
    })
      .then(response => { return response.data })
  },
  deleteCourse(id) {
    return axios({
      method: 'DELETE',
      url: 'http://localhost:3000/deletecourse',
      data: {
        id: id
      }
    })
    .then(response => { return response.data })
  },
  setProgress(user_id, progress) {
    return axios.post(`http://localhost:3000/setprogress`, {
      _id: user_id,
      progress: progress
    })
      .then(response => { return response.data })
  }
}