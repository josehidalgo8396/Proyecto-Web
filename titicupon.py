import requests
import cssutils
import psycopg2
import time
from bs4 import BeautifulSoup

def getData(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    nodeHeader = soup.find("div", attrs={"class":"node-header"})
    title = nodeHeader.find("h1", attrs={"class":"cupon-title"}).getText()
    print(title)
    subTitle = nodeHeader.find("h2", attrs={"class":"cupon-subtitle"}).getText()
    print(subTitle)
    right = nodeHeader.find("div", attrs={"class":"right"})
    maxPrice = nodeHeader.find("h3", attrs={"class":"max-price"}).getText()
    print(maxPrice)
    normalPrice = nodeHeader.find("h4", attrs={"class":"normal-price"}).getText()
    print(normalPrice)
    save = nodeHeader.find("div", attrs={"class":"saving-wrapper"}).getText()
    print(save)
    sold = nodeHeader.find("p", attrs={"class":"active"}).getText()
    print(sold)
    time = nodeHeader.find("div", attrs={"class":"cupon-clock"})
    days = time.select("p")[0].getText()
    print(days)

    nodeBody = soup.find("div", attrs={"class":"node-body"})
    left = nodeBody.find("div", attrs={"class":"left"})
    details = left.findAll("ul")
    additionals = details[0].findAll("li")
    additionalList = []
    for addition in additionals:
        additionalList.append(addition.getText())
    print(additionalList)
    restrictions = details[1].findAll("li")
    restrictionList = []
    for restriction in restrictions:
        restrictionList.append(restriction.getText())
    print(restrictionList)
    
    
def main(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    firstContent = soup.find("div", attrs={"class":"overcontent"})
    firstCupons = firstContent.findAll("form")
    conta = 1
    for cupon in firstCupons:
        print("Cupon #" + str(conta))
        newLink = cupon.select("a")[0]["href"]
        getData(link+newLink)
        conta+=1
        print("\n\n--------------------------\n\n")
    secondContent = soup.find("div", attrs={"class":"view-display-id-page_5"})
    viewContent = secondContent.find("div", attrs={"class":"view-content"})
    divs = viewContent.findAll("div", attrs={"class":"clearfix"})
    for div in divs:
        cupons = div.findAll("div", attrs={"class":"btn-wrapper"})
        for cupon in cupons:
            print("Cupon #" + str(conta))
            newLink = cupon.select("a")[0]["href"]
            getData(link+newLink)
            conta+=1
            print("\n\n--------------------------\n\n")
    
    
main("https://www.titicupon.com")
