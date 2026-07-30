import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

   const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and airborne toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the room and purifies air.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to grow and absorbs toxins effectively.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/02/aloe-vera-3284687_1280.jpg", description: "Purifies air and yields soothing gel.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-652d573d0974?q=80&w=1000&auto=format&fit=crop", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, great for cooking.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/mint-1117578_1280.jpg", description: "Refreshing aroma and versatile culinary herb.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/18/16/04/lemon-balm-2323982_1280.jpg", description: "Citrusy scent that relieves stress.", cost: "$12" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2017/03/13/21/19/hyacinth-2141158_1280.jpg", description: "Intense fragrant floral bloom.", cost: "$22" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/02/aloe-vera-3284687_1280.jpg", description: "Soothes burns and skin irritation.", cost: "$14" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/14/02/echinacea-557998_1280.jpg", description: "Boosts immunity and helps fight colds.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Helps relieve digestive discomfort.", cost: "$13" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/16/18/22/chamomile-1598730_1280.jpg", description: "Soothes anxiety and aids sleep quality.", cost: "$15" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/marigold-2516612_1280.jpg", description: "Heals skin and acts as an anti-inflammatory.", cost: "$11" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2016/08/02/09/21/thyme-1562916_1280.jpg", description: "Antibacterial properties and respiratory support.", cost: "$12" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop", description: "Thrives in low light and requires minimal water.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816940_1280.jpg", description: "Extremely resilient trailing indoor plant.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2021/01/14/19/58/plant-5917822_1280.jpg", description: "Survives harsh neglect and poor lighting.", cost: "$20" },
        { name: "Succulent Trio", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Requires minimal watering and direct sunlight.", cost: "$18" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2019/09/16/13/21/jade-plant-4481023_1280.jpg", description: "Long-lived succulent symbolizing good luck.", cost: "$15" },
        { name: "Snake Plant Compacta", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Dwarf variety perfect for small desks.", cost: "$14" }
      ]
    }
  ];

    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/ecc-5465448_1280.png" alt="" style={{ height: '50px', width: '50px' }} />
                        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                                <i style={{ color: 'white', fontSize: '14px' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px' }}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Plants</a></div>
                    <div> 
                        <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none', position: 'relative' }}>
                            <h1 className="cart" style={{ margin: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="Flat" height="40" width="40">
                                    <rect width="256" height="256" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#fafafa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                                <span className="cart_quantity_count" style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>
                                    {calculateTotalQuantity()}
                                </span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: 'center', margin: '20px' }}><div>{category.category}</div></h1>
                            <div className="product-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '10px', margin: '10px', padding: '15px', width: '280px', textAlign: 'center' }}>
                                        <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                                        <div className="product-title" style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>{plant.name}</div>
                                        <p>{plant.description}</p>
                                        <div className="product-price" style={{ fontWeight: 'bold', margin: '10px 0' }}>{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={cartItems.some(item => item.name === plant.name) || addedToCart[plant.name]}
                                            style={{ backgroundColor: cartItems.some(item => item.name === plant.name) || addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
                                        >
                                            {cartItems.some(item => item.name === plant.name) || addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
