const supertest = require("supertest");

const app = require("../../app");

exports.module = supertest(app)