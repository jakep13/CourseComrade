import certifi as certifi
from pymongo import MongoClient


def addCoursesToDB(courses):
    client = MongoClient(
        "mongodb+srv://jako:jakejake1@cluster0.ubmfc.mongodb.net/db?retryWrites=true&w=majority",
        tlsCAFile=certifi.where(),
    )

    db = client.db
    courseCollection = db["courseCollection"]

    dbCourses = []
    for (code, name) in courses:
        dbCourses.append({"code": code, "name": name})

    for course in dbCourses:
        try:
            courseCollection.insert_one(course)
        except:
            print("Course " + str(course) + " already in DB")
