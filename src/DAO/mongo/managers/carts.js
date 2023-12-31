import { cartModel } from "../models/cart.js";
import { Types } from "mongoose";
import ProductManager from "./products.js";


const pm = new ProductManager()

class CartManager {


    getCarts = async () => {
        try {
            return await cartModel.find()
        } catch (err) {
            console.log(err);
        }
    };

    getCartById = async (cartId) => {
        try {

            return await cartModel.findOne({ _id: cartId })

        } catch (err) {
            // console.log(err);
            return err
        }

    }

    addCart = async (products) => {
        try {
            const cartCreated = await cartModel.create({})
            products.forEach(product => cartCreated.products.push(product));
            cartCreated.save()
            return cartCreated

        }
        catch (err) {
            // console.log(err.message);
            return err.message;

        }
    }

    addProductInCart = async (cid, productFromBody) => {

        try {
            const cart = await cartModel.findOne({ _id: cid })

            const findProduct = cart.products.some((product) => product._id.toString() === productFromBody._id)

            if (findProduct) {
                await cartModel.updateOne({ _id: cid, "products._id": productFromBody._id }, { $inc: { "products.$.quantity": productFromBody.quantity } })
                return await cartModel.findOne({ _id: cid })
            }

            await cartModel.updateOne({ _id: cid }, { $push: { products: { _id: productFromBody._id, quantity: productFromBody.quantity } } })
            return await cartModel.findOne({ _id: cid })


        }

        catch (err) {
            console.log(err.message);
            return err

        }
    }


};

export default CartManager;