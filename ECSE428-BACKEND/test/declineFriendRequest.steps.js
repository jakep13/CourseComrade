const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('../models/user')
const { Course } = require('../models/course')

const feature = loadFeature(
  "./test/features/ID008_Decline_User_Network_Invite.feature"
);

function existsWithStatus(friends, username, status) {
    let exists = false
    friends.forEach(f => {
      if (status != null) {
        exists = exists || (f.friend.username === username && f.status === status);
      } else {
        exists = exists || (f.friend.username === username);
      }
    });
    return exists;
  }

defineFeature(feature, test => {

    const password = "pass123";

    test('Decline an invite received by a CourseComrade user to join that user\'s network (Normal Flow)', ({ given, and, when, then }) => {
    	given(/^students "(.*)" and "(.*)" exists in the system$/, async (student1, student2) => {
            const user1 = await req.post("/createAccount").send({
                username: student1,
                password: password,
                verif_password: password
            });

            const user2 = await req.post("/createAccount").send({
                username: student2,
                password: password,
                verif_password: password
            });
    	});

    	and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	given(/^"(.*)" received an invite from "(.*)"$/, async (username1, username2) => {
            // login to other student account to send request
            const login_res = await req.post("/login").send({ username: username2, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
            // send request
            const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username1 });

            // login to other student account - should have pending request
            const login_res2 = await req.post("/login").send({ username: username1, password });
            cookies = login_res2.headers['set-cookie']
            const friends_res = await req.get("/friends").set('cookie', cookies).send();
            expect(login_res2.statusCode).toBe(200);
            expect(friends_res.statusCode).toBe(200);
            expect(existsWithStatus(friends_res.body, username2, "pending")).toBe(true);
    	});

    	when(/^"(.*)" declines the invite from "(.*)"$/, async (username1, username2) => {
            // login to other student account to send request
            const login_res = await req.post("/login").send({ username: username1, password });
            cookies = login_res.headers['set-cookie'];
            expect(login_res.statusCode).toBe(200);

            // decline request
            const decline_res = await req.post("/declineFriend").set('cookie', cookies).send({ username: username2 });
            expect(decline_res.statusCode).toBe(200);
    	});

    	then(/^"(.*)" will not be added to the network of "(.*)" and vis-versa$/, async (username1, username2) => {
            // login to other student account to send request
            const login_res = await req.post("/login").send({ username: username1, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);

            // check if user1 is in user2's network
            const friends_res = await req.get("/friends").set('cookie', cookies).send();
            expect(friends_res.statusCode).toBe(200);
            let exists = false
            friends_res.body.forEach(f => {
                if (f.friend.username === username1) {
                    exists = true;
                }
            });
            console.log(friends_res.body);
            expect(exists).toBe(false);
    	});
    });



    test('Attempt to decline an invite reveived by a CourseComrade user to join that user\'s network (Error Flow)', ({ given, and, when, then }) => {
    	given(/^students "(.*)" and "(.*)" exists in the system$/, async (student1, student2) => {
            const user1 = await req.post("/createAccount").send({
                username: student1,
                password: password,
                verif_password: password
            });

            const user2 = await req.post("/createAccount").send({
                username: student2,
                password: password,
                verif_password: password
            });
    	});

    	and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	given(/^"(.*)" received an invite from "(.*)"$/, async (username1, username2) => {
            // login to other student account to send request
            const login_res = await req.post("/login").send({ username: username2, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
            // send request
            const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username1 });

            // login to other student account - should have pending request
            const login_res2 = await req.post("/login").send({ username: username1, password });
            cookies = login_res2.headers['set-cookie']
            const friends_res = await req.get("/friends").set('cookie', cookies).send();
            expect(login_res2.statusCode).toBe(200);
            expect(friends_res.statusCode).toBe(200);
            expect(existsWithStatus(friends_res.body, username2, "pending")).toBe(true);
    	});

    	and(/^"(.*)" already accepted the invite from "(.*)" in another session$/, async (username1, username2) => {
            // login to other student account
            const login_res = await req.post("/login").send({ username: username1, password });
            cookies = login_res.headers['set-cookie'];
            expect(login_res.statusCode).toBe(200);

            // accept request
            const accept_res = await req.post("/acceptFriend").set('cookie', cookies).send({ username: username2 });
            expect(accept_res.statusCode).toBe(200);
    	});

    	when(/^"(.*)" attempts to decline the invite$/, async (username1) => {
            // decline request
            const decline_res = req.post("/declineFriend").set('cookie', cookies).send({ username: username1 });
            expect(decline_res.statusCode).not.toBe(200);
    	});

    	then(/^"(.*)" will be added to the network of "(.*)" and vis-versa$/, async (username1, username2) => {
            // login to other student account to send request
            const login_res = await req.post("/login").send({ username: username2, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);

            // check if user1 is in user2's network
            const friends_res = await req.get("/friends").set('cookie', cookies).send();
            expect(friends_res.statusCode).toBe(200);
            let exists = false
            friends_res.body.forEach(f => {
                if (f.friend.username === username1) {
                    exists = true;
                }
            });
            console.log(friends_res.body);
            expect(exists).toBe(true);
    	});
    });

});