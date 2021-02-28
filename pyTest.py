import requests
import json

users_url = "https://api-career-dev-quizz.herokuapp.com/users"
questions = "https://api-career-dev-quizz.herokuapp.com/questions"
login = "https://api-career-dev-quizz.herokuapp.com/login"

# users_url = "http://localhost:3000/users"
# questions = "http://localhost:3000/questions"
# login = "http://localhost:3000/login"


def check_status_code(res):
    if res.status_code == 200:
        print(res.text)
        return res.text
    else:
        print("not found")


#get all users
r = requests.get(url = users_url)

check_status_code(r)


#get_one_user

r = requests.get(url= users_url + "/d.murairi@alustudent.com")
check_status_code(r)


#create new user
new_user = {"first_name" : "dirac",
    "last_name" : "murairi mukongya",
    "email" : "d.murairi@alustudent.com",
    "password" : "iamdirac",
    "user_classification": "student",
    "faculty" : "computer science",
    "promotion" : "2",
    "level" : 0,
    "score" : 0
}
r = requests.post(url=users_url, data=new_user)
if r.status_code == 200:
    print("added new element")
elif r.status_code == 400:
    print("user allready exist")

## create a administrator

new_administrator = {
    "first_name" : "dirac",
    "last_name" : "murairi mukongya",
    "email" : "diracm8@gmail.com",
    "password" : "iamdirac",
    "user_classification": "administrator",
}

r = requests.post(url=users_url, data=new_administrator)
if r.status_code == 200:
    print("added new element")
elif r.status_code == 400:
    print("user allready exist")
else:
    print("Nothing")


#update one
new_user_update = {"first_name" : "dirac",
    "last_name" : "murairi mukongya",
    "email" : "d.murairi@alustudent.com",
    "password" : "iamdirac",
    "user_classification": "student",
    "faculty" : "computer science",
    "promotion" : "2",
    "level" : 0,
    "score" : 0
}

r = requests.put(users_url + "/d.murairi@alustudent.com", data = new_user_update)
if r.status_code == 200:
    print(r.json())
else:
    print("could not update")


login
r = requests.get(login, data = {"email" : "d.murairi@alustudent.com", "password" : "iamdirac"})

check_status_code(r)


# r = requests.delete(users_url, data=new_user_update)

# check_status_code(r)

topic_data = {
    "question": "It's important to list out your email address in a professional way on a resume.\nWhich is the best email here assuming your name is 'Jane Smith'",
    "level": 1,
    "weight": 1,
    "options": ["janesmith@gmail.com", "thatgirljay@gmail.com"], 
    "answer": 1
}

question_2 = {
    "question" : "You have so many experiences and want to impress your employer so you can get the job.\nWhich of these 2 should you pick?",
    "level": 1,
    "weight": 1,
    "options": ["Stick to 1 page and include and include the most relevant experiences","Include all your experiences and lay them out in as many pages as you need"],
    "answer" : 1
}

question_3 = {
    "question": "When adding your employment history what's the best date structure to use?",
    "level" : 2,
    "weight" : 1,
    "options" : ["2017-2018: Program Manager","June 2017-December 2018:Program Manager at Best Company"],
    "answer" : 2
}

question_4 = {
    "question" : "Is it important to update your resume with keywords from your desired job description?",
    "level" : 2,
    "weight" : 1,
    "options" :  ["Yes","No"],
    "answer" : 2
}

question_5 = {
    "question" : "You should apply for all job positions you find irregardless of your resume and qualifications, it's a better strategy.\nDo you agree?",
    "level" : 3,
    "weight": 1,
    "options" : ["True","False"],
    "answer" : 2
}

r = requests.post(questions, data=topic_data)

print("===",  r.status_code)

r = requests.post(questions, data=question_2)

print("===",  r.status_code)

r = requests.post(questions, data=question_3)

print("===",  r.status_code)

r = requests.post(questions, data=question_4)

print("===",  r.status_code)

r = requests.post(questions, data=question_5)

print("===",  r.status_code)

r = requests.get(questions)

check_status_code(r)
