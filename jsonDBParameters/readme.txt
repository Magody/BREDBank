El orden de ejecución de los JSON es:


Provinces.json
-> mongoimport --db bred_bank --collection provinces --file Provinces.json

movements.json
-> mongoimport --db bred_bank --collection movements --file movements.json

clients.json debe modificarse el id respectivo que se haya generado en la coleccion "provinces"
-> mongoimport --db bred_bank --collection clients --file clients.json

accounts.json debe modificarse el id que se haya generado en la coleccion "clients"
-> mongoimport --db bred_bank --collection accounts --file accounts.JSON


Para generar transacciones se usa un POST a /api/payments del tipo

{
	"clientSource": "cliente3",
	"password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
	"clientDest": "cliente2",
	"amount": 175.34,
	"description": "Venta Ecommerce",
	"operationId": 0
	
}

Enviará un correo electrónico

