import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
// import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.state = {
      course: { title: '' }
    };
    this.onTitleChanges = this.onTitleChanges.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  onTitleChanges(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSave() {
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h3>Add Course</h3>
        <input type="text"
          value={this.state.course.title}
          className="form-control"
          onChange={this.onTitleChanges} /><br />

        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
