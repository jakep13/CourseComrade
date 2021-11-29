const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('../models/user')
const { Course } = require('../models/course')

const feature = loadFeature(
    "./test/features/ID017_View_Comrades_Classes.feature"
);

defineFeature(feature, (test) => {
    const password = "pass123"
    let responseMessage = "";
    let responseStatus = "";
    let registeredCourses = [];
    let cookies;

    afterEach(() => {
        cookies = null;
        responseMessage = "";
        responseStatus = "";
        registeredCourses = [];
    });

    test('View list of a comrade\'s added classes (Normal Flow)', ({ given, and, when, then }) => {
        given(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
        });

        and(/^student "(.*)" exists in the system$/, async (username) => {
            const res = await req.post("/createAccount").send({ username, password, verif_password: password });
            expect(res.statusCode).toBe(200);
        });

        and(/^student "(.*)" is in the personal network of student "(.*)"$/, async (username2, username1) => {
            // send friend request
            const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username2 });

            // login as friend to accept request
            const login_res = await req.post("/login").send({ username: username2, password: password });
            const loc_cookies = login_res.headers['set-cookie'];
            expect(login_res.statusCode).toBe(200);

            // accept friend request
            const accept_res = await req.post("/acceptFriend").set('cookie', loc_cookies).send({ username: username1 });
            expect(accept_res.statusCode).toBe(200);
        });

        and(/^student "(.*)" added the following courses:$/, (username, table) => {
            table.forEach(r => {
                addCourse(username, r.course, r.course_name)
            });
        });

        when(/^user "(.*)" requests to view the classes of "(.*)"$/, async (username1, username2) => {
            res = await req.get("/comradesCourses").set('cookie', cookies).send({ username: username2 });
            registeredCourses = res.body
        });

        then('the following list of classes is generated:', (table) => {
            recievedCourses = registeredCourses.map(c => c.code);
            expectedCourses = table.map(c => c.course);

            expectedCourses.forEach(course => {
                expect(recievedCourses.includes(course)).toBe(true);
            });
            expect(recievedCourses.length).toBe(expectedCourses.length);
        });
    });

    test('Attempt to view personal registered classes when no classes are registered (Alternate Flow)', ({ given, and, when, then }) => {
        given(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
        });

        and(/^student "(.*)" exists in the system$/, async (username) => {
            const res = await req.post("/createAccount").send({ username, password, verif_password: password });
            expect(res.statusCode).toBe(200);
        });

        and(/^student "(.*)" is in the personal network of student "(.*)"$/, async (username2, username1) => {
            // send friend request
            const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username2 });
            expect(friendReq_res.statusCode).toBe(200);

            // login as friend to accept request
            const login_res = await req.post("/login").send({ username: username2, password: password });
            const loc_cookies = login_res.headers['set-cookie'];
            expect(login_res.statusCode).toBe(200);

            // accept friend request
            const accept_res = await req.post("/acceptFriend").set('cookie', loc_cookies).send({ username: username1 });
            expect(accept_res.statusCode).toBe(200);
        });

        and(/^student "(.*)" has no registered courses$/, async (username) => {
            const user = await User.findOne({ username });
            expect(user.courses.length).toBe(0);
        });

        when(/^user "(.*)" requests to view the classes of "(.*)"$/, async (username1, username2) => {
            res = await req.get("/comradesCourses").set('cookie', cookies).send({ username: username2 });
            responseMessage = res.body.message
        });

        then(/^a resulting "(.*)" message is issued$/, (errMsg) => {
            expect(responseMessage).toContain(errMsg);
        });
    });

    function addCourse(username, code, name) {
        let new_course = new Course({ code, name })
        new_course.save();

        User.findOneAndUpdate(
            { username },
            { $push: { courses: code } },
            function (err, doc) {
                if (err) {
                    console.log(err)
                }
            });
    }

});