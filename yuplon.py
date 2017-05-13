import requests
import cssutils
import psycopg2
import time
from bs4 import BeautifulSoup

db = psycopg2.connect(database="dfq0rj1rheq4qq", user="mrlkocoknmudag", password="fae9159ceda9d067cabfb2a830728386bc4bc4d5bbc64314762315afc6170696", host="ec2-54-204-32-145.compute-1.amazonaws.com", port="5432")

def getData(link):
    lista = []
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    title = soup.find("h3", attrs={"class":"title"}).getText()
    title = title.strip()
    #print(title)
    lista.append(title)
    mainRight = soup.find("div", attrs={"id":"main-right"})
    images = mainRight.select("img")
    image = images[0]["src"]
    #print(image)
    lista.append(image)
    image2 = images[1]["src"]
    #print(image2)
    lista.append(image2)
    mainLeft = soup.find("div", attrs={"id":"main-left"})
    price = mainLeft.find("div", attrs={"class":"txt-label-price"}).getText()
    #print(price)
    lista.append(price)
    table = mainLeft.find("div", attrs={"id":"deal-brief"})
    tds = table.findAll("td")
    value = tds[0].getText()
    #print(value)
    lista.append(value)
    discount = tds[1].getText()
    #print(discount)
    lista.append(discount)
    save = tds[2].getText()
    #print(save)
    lista.append(save)
    sold = mainLeft.find("div", attrs={"class":"sold-text-locker"}).getText()
    sold = sold.strip()
    #print(sold)
    lista.append(sold)
    mainRight = soup.find("div", attrs={"id":"main-right"})
    mainRightInfo = mainRight.find("div", attrs={"id":"main-right-yellowbox"})
    tds = mainRightInfo.findAll("td")
    canDoList = tds[0].findAll("li")
    canDo = []
    for i in canDoList:
        canDo.append(i.getText())
    #print(canDo)
    lista.append(canDo)
    outstandingList = tds[1].findAll("li")
    outstanding = []
    for i in outstandingList:
        outstanding.append(i.getText())
    #print(outstanding)
    lista.append(outstanding)
    insertData(lista)

def insertData(lista):
    listaTemp = []
    lista[3] = float(lista[3].replace("₡","").replace(",","."))
    lista[4] = float(lista[4].replace("₡","").replace(",","."))
    lista[5] = int(lista[5].replace("%",""))
    lista[6] = float(lista[6].replace("₡","").replace(",","."))
    lista[7] = int(lista[7].split(" ")[1])
    listaTemp.append(lista[0])
    listaTemp.append(lista[1])
    listaTemp.append(lista[2])
    listaTemp.append(lista[3])
    listaTemp.append(lista[4])
    listaTemp.append(lista[5])
    listaTemp.append(lista[6])
    listaTemp.append(lista[7])
    query = ("insert into PROMOTION(title, image1, image2, price, value, discount, save, sold) values(%s,%s,%s,%s,%s,%s,%s,%s)")
    promotion = tuple(listaTemp)
    cursor = db.cursor()
    cursor.execute(query,promotion)
    db.commit()
    query = "select id from PROMOTION order by id desc limit 1"
    cursor.execute(query)
    idCupon = cursor.fetchone()[0]
    for i in lista[8]:
        query2 = ("insert into PROMOTION_MUST_KNOW_INFO(idPromotion, info) values(%s,%s)")
        info = (idCupon, i)
        cursor.execute(query2, info)
        db.commit()
    for i in lista[9]:
        query2 = ("insert into PROMOTION_IMPORTANT_INFO(idPromotion, info) values(%s,%s)")
        info = (idCupon, i)
        cursor.execute(query2, info)
        db.commit()
    cursor.close()


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
