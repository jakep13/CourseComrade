const database = require("../database")

beforeEach( async (done) => {
    await database.connect();
    done();
});

afterEach( async (done) => {
    await database.clear();
    done();
});


afterAll( async (done) => {
    await database.close();
    done();
});