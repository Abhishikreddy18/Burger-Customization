const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        type: String,
        required: true
      },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Burger'
            },
            selectedIngredients: {
                type: Map,
                of: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        name:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        update_time: {
            type: String
        },
        email_address: {
            type: String
        }
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 10.0
    },
    shippingprice: {
        type: Number,
        required: true,
        default: 10.0
    },
    totalprice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: String,
        enum:['Delivered', 'Processing', 'Cancelled','Pending'],
        required:true,
        default: 'Pending'
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
