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
    nodeHeader = soup.find("div", attrs={"class":"node-header"})
    title = nodeHeader.find("h1", attrs={"class":"cupon-title"}).getText()
    #print(title)
    lista.append(title)
    subTitle = nodeHeader.find("h2", attrs={"class":"cupon-subtitle"}).getText()
    #print(subTitle)
    lista.append(subTitle)
    left = nodeHeader.find("div", attrs={"class":"left"})
    image = left.select("img")
    imageSrc = image[0]["src"]
    #print(imageSrc)
    lista.append(imageSrc)
    right = nodeHeader.find("div", attrs={"class":"right"})
    maxPrice = nodeHeader.find("h3", attrs={"class":"max-price"}).getText()
    #print(maxPrice)
    lista.append(maxPrice)
    normalPrice = nodeHeader.find("h4", attrs={"class":"normal-price"}).getText()
    #print(normalPrice)
    lista.append(normalPrice)
    save = nodeHeader.find("div", attrs={"class":"saving-wrapper"}).getText()
    #print(save)
    lista.append(save)
    sold = nodeHeader.find("p", attrs={"class":"active"}).getText().strip()
    #print(sold)
    lista.append(sold)
    time = nodeHeader.find("div", attrs={"class":"cupon-clock"})
    days = time.select("p")[0].getText()
    #print(days)
    lista.append(days)

    nodeBody = soup.find("div", attrs={"class":"node-body"})
    left = nodeBody.find("div", attrs={"class":"left"})
    details = left.findAll("ul")
    additionals = details[0].findAll("li")
    additionalList = []
    for addition in additionals:
        additionalList.append(addition.getText())
    #print(additionalList)
    lista.append(additionalList)
    restrictions = details[1].findAll("li")
    restrictionList = []
    for restriction in restrictions:
        restrictionList.append(restriction.getText())
    #print(restrictionList)
    lista.append(restrictionList)
    insertData(lista)

def insertData(lista):
    listaTemp = []
    lista[3] = float(lista[3].replace("₡","").replace(",","."))
    lista[4] = float(lista[4].replace("₡","").replace(",","."))
    lista[5] = int(lista[5].split(" ")[1].replace("%",""))
    lista[6] = int(lista[6].split(" ")[1])
    lista[7] = int(lista[7].split(" ")[3])
    listaTemp.append(lista[0])
    listaTemp.append(lista[1])
    listaTemp.append(lista[2])
    listaTemp.append(lista[3])
    listaTemp.append(lista[4])
    listaTemp.append(lista[5])
    listaTemp.append(lista[6])
    listaTemp.append(lista[7])
    query = ("insert into CUPON(title, subtitle, image, maxPrice, normalPrice, save, sold, days, active) values(%s,%s,%s,%s,%s,%s,%s,%s,1)")
    promotion = tuple(listaTemp)
    cursor = db.cursor()
    cursor.execute(query,promotion)
    db.commit()
    query = "select id from CUPON order by id desc limit 1"
    cursor.execute(query)
    idCupon = cursor.fetchone()[0]
    for i in lista[8]:
        query2 = ("insert into CUPON_ADDITIONAL_INFO(idCupon, info) values(%s,%s)")
        info = (idCupon, i)
        cursor.execute(query2, info)
        db.commit()
    for i in lista[9]:
        query2 = ("insert into CUPON_RESTRICTION_INFO(idCupon, info) values(%s,%s)")
        info = (idCupon, i)
        cursor.execute(query2, info)
        db.commit()
    cursor.close()
    
    
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
