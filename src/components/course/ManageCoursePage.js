import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    redirect() {
        this.setState({ saving: false });
        // toastr.success('Course saved');
        this.context.router.push('/courses');
    }


    // saveCourse(event) {
    //     event.preventDefault();

    //     if (!this.courseFormIsValid()) {
    //         return;
    //     }

    //     this.setState({ saving: true });

    //     this.props.actions.saveCourse(this.state.course)
    //         .then(() => this.redirect())
    //         .catch(error => {
    //             // toastr.error(error);
    //             this.setState({ saving: false });
    //         });
    // }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm course={this.state.course} errors={this.state.errors} allAuthors={this.props.authors}
                onChange={this.updateCourseState} onSave={this.saveCourse} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
    console.log(state)
    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
