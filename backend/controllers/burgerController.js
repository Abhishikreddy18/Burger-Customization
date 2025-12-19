const Burgers=require('../models/burgerSchema')
const User=require('../models/Users')
const getBurgers= async (req, res) => {
    try {
        const burgers = await Burgers.find();// Fetch all burger data from the database 
        //throw new Error('not reachable')
        res.json(burgers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Send a 500 response in case of error
    }
}
const createBurgers = async (req, res) => {
    const { burgerdata } = req.body;
    try {
        // Check if user exists (optional)
        console.log(burgerdata.user)
        const userExists = await User.findById(burgerdata.user);
        if (!userExists) {
            return res.status(400).json({ message: 'User not found' });
        }
        console.log(userExists)
        // Extract address data
        console.log(burgerdata);
        // Ensure burgerdata.address is an array before mapping
        const addresses = Array.isArray(burgerdata.address) ? burgerdata.address.map(addr => ({
            number: addr.number,
            line1: addr.line1,
            country: addr.country,
            line2: addr.line2,
            postcode: addr.postcode
        })) : [];

        // Create a new Burger instance
        const newBurger = new Burgers({
            User: burgerdata.user,
            name: burgerdata.name,
            restaurant: burgerdata.restaurant,
            web: burgerdata.web || 'burger-king',
            description: burgerdata.description,
            ingredients: burgerdata.ingredients,
            addresses
        });

        // Save the new Burger instance to the database
        const savedBurger = await newBurger.save();

        // Return success response
        res.status(201).json({ message: 'Burger created successfully', burger: savedBurger });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteBurger=async(req,res)=>{
    try {
        const burger = await Burgers.findById(req.params.id);
        if (!burger) {
            return res.status(404).json({ message: 'Burger not found' });
        }
        await burger.remove();
        res.json({ message: 'Burger deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const updateBurgers=async(req,res)=>{
    const { burgerdata } = req.body;
    console.log(burgerdata)
    try {
        const userExists = await User.findById(burgerdata.user);
        if (!userExists) {
            return res.status(400).json({ message: 'User not found' });
        }
        const burger = await Burgers.findById(req.params.id);
        if (!burger) {
            return res.status(404).json({ message: 'Burger not found' });
        }
        burger.name = burgerdata.name;
        burger.restaurant = burgerdata.restaurant;
        burger.web = burgerdata.web || 'burger-king';
        burger.description = burgerdata.description;
        burger.ingredients = burgerdata.ingredients;
        const updatedBurger = await burger.save();
        console.log("updatedburger")
        res.json({ message: 'Burger updated successfully', burger: updatedBurger });
    } catch (error) {
        res.status(500).json({ message: 'Server error' }); 
    }

}

module.exports ={getBurgers,createBurgers,deleteBurger,updateBurgers};