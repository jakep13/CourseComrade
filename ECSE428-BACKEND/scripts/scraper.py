from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time
from dbAdder import addCoursesToDB

driver = webdriver.Chrome(ChromeDriverManager().install())


def parseAllPages(url, pages):
    baseUrl = url + "&page={}"

    courses = []
    for page in range(0, pages):
        newCourses = parsePage(baseUrl.format(page))
        courses = courses + newCourses

    return courses


def parsePage(url):
    driver.get(url)
    page_source = driver.page_source

    soup = BeautifulSoup(page_source, "lxml")
    courses = []
    reviews_selector = soup.find("div", class_="view-content")
    courses_selector = reviews_selector.find_all("a")

    for course in courses_selector:
        text = course.contents[0]
        sect, num, name = text.split(" ", 2)
        name, _ = name.split(" (", 1)
        name = name.strip()
        code = sect + num
        courses.append((code, name))
        print(f"'{code}', '{name}'")

    return courses


def parseAllUrls():
    urls = [
        (
            "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_faculty_code%3AEN&f%5B3%5D=field_subject_code%3AECSE",
            4,
        ),
        (
            "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_subject_code%3ACOMP",
            2,
        ),
        (
            "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_dept_code%3A0290",
            4,
        ),
        (
            "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_dept_code%3A0111",
            2,
        ),
        (
            "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_dept_code%3A0293",
            2,
        ),
    ]

    courses = []
    for url in urls:
        courses = courses + parseAllPages(url[0], url[1])

    return courses


addCoursesToDB(parseAllUrls())

# for review_selector in reviews_selector:
#     review_div = review_selector.find("div", class_="dyn_full_review")
#     if review_div is None:
#         review_div = review_selector.find("div", class_="basic_review")
#     review = review_div.find("div", class_="entry").find("p").get_text()
#     review = review.strip()
#     reviews.append(review)


# import requests
# from bs4 import BeautifulSoup
# import pandas as pd

# page = requests.get(
#     "https://www.mcgill.ca/study/2021-2022/courses/search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_faculty_code%3AEN&f%5B3%5D=field_subject_code%3AECSE"
# )
# soup = BeautifulSoup(page.text, "html.parser")

# # Pull all text from the BodyText div
# artist_name_list = soup.find(class_="view-content")

# # Pull text from all instances of <a> tag within BodyText div
# artist_name_list_items = artist_name_list.find_all("a")

# for artist_name in artist_name_list_items:
#     print(artist_name.prettify())

# driver = webdriver.Chrome("~/Downloads/chromedriver")

# names=[] #List to store name of the product
# prices=[] #List to store price of the product
# ratings=[] #List to store rating of the product
# driver.get("<a href="https://www.mcgill.ca/study/2021-2022/courses/">https://www.mcgill.ca/study/2021-2022/courses/</a>search?f%5B0%5D=terms%3AFall%202021&f%5B1%5D=level%3Aundergraduate&f%5B2%5D=field_faculty_code%3AEN&f%5B3%5D=field_subject_code%3AECSE&amp;amp;amp;amp;amp;amp;amp;amp;amp;uniq")

# content = driver.page_source
# soup = BeautifulSoup(content)
# for a in soup.findAll('a',href=True, attrs={'class':'view-content'}):
#   name=a.find('div', attrs={'class':'views-field views-field-field-course-title-long'})
#   names.append(name.text)

# df = pd.DataFrame({'Name': names})
# print(df)
# df.to_csv('products.csv', index=False, encoding='utf-8')
