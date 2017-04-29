import requests
import cssutils
import psycopg2
import time
from bs4 import BeautifulSoup


def getData(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    title = soup.find("h3", attrs={"class":"title"}).getText()
    title = title.strip()
    print(title)
    mainLeft = soup.find("div", attrs={"id":"main-left"})
    price = mainLeft.find("div", attrs={"class":"txt-label-price"}).getText()
    print(price)
    table = mainLeft.find("div", attrs={"id":"deal-brief"})
    tds = table.findAll("td")
    value = tds[0].getText()
    print(value)
    discount = tds[1].getText()
    print(discount)
    save = tds[2].getText()
    print(save)
    sold = mainLeft.find("div", attrs={"class":"sold-text-locker"}).getText()
    sold = sold.strip()
    print(sold)
    '''
    timer = mainLeft.find("div", attrs={"id":"deal-timer"})
    countDown = timer.find("div", attrs={"id":"defaultCountdown"})
    days = countDown.select("days")
    print(days)
    '''
    mainRight = soup.find("div", attrs={"id":"main-right"})
    mainRightInfo = mainRight.find("div", attrs={"id":"main-right-yellowbox"})
    tds = mainRightInfo.findAll("td")
    canDoList = tds[0].findAll("li")
    canDo = []
    for i in canDoList:
        canDo.append(i.getText())
    print(canDo)
    outstandingList = tds[1].findAll("li")
    outstanding = []
    for i in outstandingList:
        outstanding.append(i.getText())
    print(outstanding)


def main(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    cupons = soup.findAll("div", attrs={"class":"extra-campaign"})
    conta = 1
    for cupon in cupons:
        print("Cupon #" + str(conta))
        newLink = cupon.select("a")[0]["href"]
        getData(link+newLink)
        conta+=1
        print("\n\n--------------------------\n\n")
        
    

main("http://www.yuplon.com")
