import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext} from 'react'
import  { Link } from 'react-router-dom'
import{ ShoppingCartContext} from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice} from '../../utils'
import './styles.css'

const CheckoutSideMenu = () =>{
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) =>{
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () =>{
        const orderToAdd ={
            date: '01.22.25',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)  // Use totalPrice function from utils.js
        }
        context.setOrder([...context.order, orderToAdd ])
        context.setCartProducts([])
        context.setSearchByTitle ( null )
    }
    
    return(
        <aside
         className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'}  checkout-side-menu  flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                    <XMarkIcon 
                    className='h-6  w-6 cursor-pointer text-black' 
                    onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
                </div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
            {
                context.cartProducts.map(product =>(
                    <OrderCard 
                        key ={product.id}
                        id={product.id}
                        title={product.title} 
                        imageURL={product.images} 
                        price={product.price} 
                        handleDelete = {handleDelete}
                    />
                ))
            }
            </div>
            <div className='px-6 mb-6'>
                    <p className='flex justify-between items-center mb-2'>
                        <span className='font-light'>Total: </span>
                        <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                    </p>
                    <Link to='/my-orders/last'>
                        <button
                              className='w-full text-white bg-black py-3 rounded-lg hover:bg-gray-700'
                              onClick={()=> handleCheckout()}>Checkout</button>
                    </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu