/* 

	Project: E-commerce

	Modules: 
		* Categories
			name
			description

		* Products
			category
			name
			price	
			shortDescription
			longDescription
			image
		* Users (with role)
			username
			password
			contact
			email
			role (admin, user)
		* Orders (only for role user)
			user
			products (array of products) [
				{
					product: product,
					quantity: number
					status: (pending, accepted, rejected)
					date: date
					isPaid: boolean
				}				
			]
			totalPrice

		* Statistics
			* TotalMoney in a month (paid)
			* TotalMoney in a month (unpaid)
			* The most expensive product
			* The most expensive product in a month (number)
			* The last expensive product in a month (number)
	
	
	unauthorized users: -> see products | see categories | login | register |
	authorized users: -> see products | see categories | see orders | add orders | delete order with unpaind | edit orders only (unpaind) | pay order | logout
	
	authorization admin:
		* add category (
			* name
			* description
		)

		* edit category (
			* name
			* description
		)

		* delete category (
			* id
		)



		* add product (
			* category
			* name
			* price	
			* shortDescription
			* longDescription
			* image
		)

		* edit product (
			* category
			* name
			* price	
			* shortDescription
			* longDescription
			* image
		)

		* delete product (
			* id
		)

		

		* see orders
		* TotalMoney in a month (paid)
		* TotalMoney in a month (unpaid)
		* The most expensive product
		* The most expensive product in a month (number)
		* The last expensive product in a month (number)


		

*/