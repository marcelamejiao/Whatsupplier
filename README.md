# **WhatSupplier - MERN Stack Single-Page Application**

## **Table of Contents** 

- [**Description**](#description)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Preview**](#preview)
- [**Deployed link**](#deployed-link)
- [**Future Development**](#future-development)
- [**Questions**](#questions)


## **Description**

This project will create a software to provide a tool for organizing and optimizing the process of ordering, storing, and using a company’s inventory. Also the application will help with the selection of the supplier's lowest cost.

In the Supply Chain process the factory purchases the raw materials from diverse suppliers. Using the software the supplier’s manager can choose the best offer in price without sacrificing quality when needed to place a raw materials order. 

* WhatSupplier will use a function to decide which supplier offers the lowest cost to place an order. 

* WhatSupplier will use a function to determine the quantity in inventory of any raw material to proceed with placing a new order. This function is called ROP “Reorder Point’.
 
      What is a Reorder Point? 
      Order Point (aka Reorder Point) is a key concept within Inventory Management. Order too soon and financials will suffer as too much money is invested in inventory and you may not have enough space to store the inventory. Order too late and you may run out of inventory resulting in waste in the form of stock outs and poor customer service.
      Order Point formula is:
      Anticipated Demand (D) x Lead Time (L) + Safety Stock (SS) 
      Ref: https://apicsdotcoach.wordpress.com/2017/02/18/order-point/

* Sending Raw Materials to production: 
When the user sends an amount of raw materials to production the total amount of this raw material will decrease. If it is time to place a new order a display notification is shown on screen to proceed with the reorder process. 

### **User Story:**
  AS A manager in a Suppliers and Raw Materials Inventory area,

  I WANT to choose the best supplier with the lowest cost, supervise stocks and place raw materials orders on time,

  SO THAT I can effectively provide the stocks to the production area and optimize the supply chain process in the company.

### **Wireframes:**
 To see the wireframes and aditional information about the project planning: [click here!](https://docs.google.com/document/d/1GMc3-rKcXWFA2Aj1BXcAQgLNudQANhHkr_l39hxE-J4/edit#heading=h.yyrhu7ml5bea)


## **Installation**

```
npm install
```

```
npm run start
```


## **Usage**


## **Preview**

 ![]()
 ![]()

## **Testing with Stripe**

When testing the payment system (Stripe) please use one of the credit cards found here: [https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers#visa](https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers#visa)

## **Deployed link**

💡 Live version: [click here!]()

## **Future Development**

* Include final products and production area extension. Joining raw materials quantity to create a final product, including production times and costs. 
* Statistics graphics of raw materials usage, costs and suppliers preferences.
* Develop an Orders system to place an order with suppliers. Update inventory when order arrives from the Supplier. 
* Edit my profile page with company information. 


## **Questions**

* Contact us on our GitHub profiles: [Chujun's GitHub](https://github.com/dorisliu333) - [Marcela's GitHub](https://github.com/marcelamejiao)

* If you have additional questions, please email us at: 