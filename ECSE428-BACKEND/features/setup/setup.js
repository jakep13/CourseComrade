const database = require("./test_database")

beforeAll( async () => {

    const a = await database.connect();
    console.log("just connected")
    // done();
});

// afterEach( async (done) => {
//     const a = await database.clear();
//     // done();
// });


// afterAll( async (done) => {
//     const a = await database.close();
//     done();
// });


