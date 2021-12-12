let carts = document.querySelectorAll('.add-cart');
let products =[
    {
	name: 'Cassandra',
	tag: 'cassandranecklace',
	price:219,
	inCart:0
	},
	{
	name: 'Cecilia',
	tag: 'cecilianecklace',
	price:219,
	inCart:0
	},
	{
	name: 'Clara',
	tag: 'claranecklace',
	price:219,
	inCart:0
	},
	{
	name: 'Corine',
	tag: 'corinenecklace',
	price:189,
	inCart:0
	},
	{
	name: 'Katrina',
	tag: 'katrinanecklace',
	price:189,
	inCart:0
	},
	{
	name: 'Justin',
	tag: 'justinnecklace',
	price:189,
	inCart:0
	},
	{
	name: 'Lauren',
	tag: 'laurennecklace',
	price:219,
	inCart:0
	},
	{
	name: 'Mirella',
	tag: 'mirellanecklace',
	price:219,
	inCart:0
	}
]
for (let i=0; i < carts.length; i++  )
{
    carts[i].addEventListener('click' , () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) 
    {
        document.querySelector("body > nav > div > div > ul > li > a > span").textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers )
    {
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector("body > nav > div > div > ul > li > a > span").textContent = productNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers' ,  1);
        document.querySelector("body > nav > div > div > ul > li > a > span").textContent = 1;
    }
    setItems(product);   
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } 
    else
    {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
      (cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');
    
	
    if(cartCost != null){
		cartCost= parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        products.price);
    }
    else{
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart(){
	let cartItem = localStorage.getItem("productsInCart");
	cartItem = JSON.parse(cartItem);
	let productContainer = document.querySelector
	(".products");
	 let cartCost = localStorage.getItem('totalCost');
	
	console.log(cartItem);
	if(cartItem && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItem).map(item => {
			productContainer.innerHTML += `
			<div class="product">
			<button><i class="fa fa-trash" aria-hidden="true"></i></button>
			  <div class="image">
			     <img src="./nck/${item.name}.jpg">
			  </div>
			    <div class="item-name">
			        <span>${item.name}</span>
			    </div>
			        <div class="price">
			             &#8369; ${item.price}.00
			         </div>
			            <div class"quantity">
						     <button><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
			                 <span>${item.inCart}</span>
							 <button><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
			            </div>
			                <div class="total">
			                  &#8369; ${item.inCart * item.price}.00
			                 </div>  
			  </div> 			   
			`
		});
		
		productContainer.innerHTML += `
		<div class="basketTotalContainer">
		   <h4 class="basketTotalTitle">
		      Cart Total:
		   </h4>
		   <h4 class="basketTotal">
		      &#8369; ${cartCost}.00
		   </h4>
		</div> 
         
		<button class="checkout-btn"><i class="fa fa-shopping-cart" aria-hidden="true"></i> CHECKOUT</button>			
		`;
		
	}
}

onLoadCartNumbers();
displayCart();
