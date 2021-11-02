import certifi as certifi
from pymongo import MongoClient

client = MongoClient('mongodb+srv://jako:jakejake1@cluster0.ubmfc.mongodb.net/db?retryWrites=true&w=majority',
                     tlsCAFile=certifi.where())

db = client.db
courseCollection = db["courseCollection"]

# users = userCollection.find()
#
# for user in users:
#     print(user)

course_names = ['ECSE', 'COMP', 'MATH', 'ECON', 'PHIL', 'MGCR', 'FACC', 'FINE', 'PHYS', 'CHEM', 'MECH', 'MIME']
course_numbers = [i for i in range(100, 599)]
courses = []

for course_name in course_names:
    for course_number in course_numbers:
        courses.append({'code': course_name + str(course_number)})

for course in courses:
    try:
        courseCollection.insert_one(course)
    except:
        print('Course ' + str(course) + ' already in DB')
        