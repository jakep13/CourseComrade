const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('../models/user')
const { Course } = require('../models/course')

const feature = loadFeature(
  "./test/features/ID014_Search_Comrades_by_Class.feature"
);


defineFeature(feature, test => {

    const password = "pass123";

    test('Get list of comrades registered in a class (Normal Flow)', ({ given, and, when, then }) => {
    	given(/^student "(.*)" exists in the system$/, async (username) => {
            const user = await req.post("/createAccount").send({
                username: username,
                password: password,
                verif_password: password
            });
    	});

    	and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	given(/^the class "(.*)" exists$/, async (code) => {
            var newCourse = new Course({ code: code, name: "name" })
            newCourse.save()
            const res = await req.get("/getCourse").set('cookie', cookies).send({ course: code });
            expect(res.statusCode).toBe(200); // TODO: need to fix this
    	});

    	and(/^(.*) is a comrade of "(.*)" that is registered in class "(.*)":$/, async (friend_username, username, code) => {
                // friend exists
                const user = await req.post("/createAccount").send({
                        username: friend_username,
                        password: password,
                        verif_password: password
                    });

                // send friend request
                const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: friend_username });

                // login as friend to accept request
                const login_res = await req.post("/login").send({ username: friend_username, password: password });
                const loc_cookies = login_res.headers['set-cookie'];
                expect(login_res.statusCode).toBe(200);

                // accept friend request
                const accept_res = await req.post("/acceptFriend").set('cookie', loc_cookies).send({ username: username });
                expect(accept_res.statusCode).toBe(200);

                // check if they are friends
                const friends_res = await req.get("/friends").set('cookie', cookies);
                expect(friends_res.statusCode).toBe(200);
                let exists = false;
                friends_res.body.forEach(f => {
                        if (f.friend.username === friend_username) {
                                exists = true;
                        }
                });
                expect(exists).toBe(true);

                // register to course
                const register_res = await req.post("/addCourse").set('cookie', loc_cookies).send({ course: code , name: "test Course"});
                expect(register_res.statusCode).toBe(200);
    	});
        
        let friends_res;
    	when(/^"(.*)" searches for comrades registered in class "(.*)"$/, async (username, code) => {
                // relogin as user
                const login_res2 = await req.post("/login").send({ username, password });
                cookies = login_res2.headers['set-cookie']
                expect(login_res2.statusCode).toBe(200);

                // get friends by course
                friends_res = await req.post("/friendsByCourse").set('cookie', cookies).send({ course: code });
                expect(friends_res.statusCode).toBe(200);
    	});

    	then(/^"(.*) should see (.*) in the list of comrades$/, async (username, friend_username) => {
                // check if friend is in list
                let exists = false;
                friends_res.body.forEach(f => {
                        if (f === friend_username) {
                                exists = true;
                        }
                });
                expect(exists).toBe(true);
    	});
    });

    let errMsg = "";
    test('Get list of comrades registered in a non-existent class (Error Flow)', ({ given, and, when, then }) => {
    	given(/^student "(.*)" exists in the system$/, async (username) => {
            const user = await req.post("/createAccount").send({
                username: username,
                password: password,
                verif_password: password
            });
    	});

    	and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	given(/^the class "(.*)" does not exist$/, async (code) => {
            const res = await req.get("/getCourse").set('cookie', cookies).send({ course: code });
            expect(res.statusCode).toBe(403);
    	});

    	when(/^"(.*)" searches for comrades registered in class "(.*)"$/, async (username, code) => {
           // relogin as user
           const login_res2 = await req.post("/login").send({ username, password });
           cookies = login_res2.headers['set-cookie']
           expect(login_res2.statusCode).toBe(200);

           // get friends by course
           const friends_res = await req.post("/friendsByCourse").set('cookie', cookies).send({ course: code });
           errMsg = friends_res.body.message;
           expect(friends_res.statusCode).toBe(400);         
    	});

    	then(/^the error message "(.*)" is issued$/, async (arg0) => {
                expect(errMsg).toBe(arg0);
    	});
    });
});
