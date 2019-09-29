const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// Graphql Schema
let schema = buildSchema(`
    type Query {
      course(id: Int!): Course
      courses(topic: String): [Course]                
    }
    type Mutation {
      updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
    }
`);

let coursesData = [
    {
        id: 1,
        title: 'Heavyweights',
        author: 'Ben Stiller',
        description: 'Sweet movie from the 90s',
        topic: 'camping',
        url: '#'
    },
    {
        id: 2,
        title: 'Cool Runnings',
        author: 'John Candy',
        description: 'Jamaican Bobsled Team',
        topic: 'Olympics',
        url: '#'
    }
];

let getCourse = args => {
    let id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
};

let getCourses = args => {
    if (args.topic) {
        let topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return courseData;
    }
};

let updateCourseTopic = ({ id, topic }) => {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
};

// root resolver
let root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

// Create an express server and a Graphql endpoint

let app = express();
app.use(
    '/graphql',
    express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(4000, () =>
    console.log('express graphql server is running...on 4000/graphql')
);
