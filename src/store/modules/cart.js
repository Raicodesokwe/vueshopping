export default {
    namespaced: true,
    state() {
        return {
            items: [],
            total: 0,
            qty: 0
        }
    },
    mutations: {
        addProductToCart(state, payload) {
            
            const productData = payload
            const productInCartIndex = state.items.findIndex(
                (ci) => ci.productId === productData.id
            );

            if (productInCartIndex >= 0) {
                state.items[productInCartIndex].qty++;
            } else {
                const newItem = {
                    productId: productData.id,
                    title: productData.title,
                    image: productData.image,
                    price: productData.price,
                    qty: 1,
                };
                state.items.push(newItem);
            }
            state.qty++;
            state.total += productData.price;
        },

        removeProductFromCart(state, payload) {
            const productData = payload.productId
            const productInCartIndex = state.items.findIndex(
                (cartItem) => cartItem.productId === productData
            );
            const prodData = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= prodData.qty;
            state.total -= prodData.price * prodData.qty;
        },
    },
    actions: {
        addToCart(context, payload) {
            const prodId=payload.id;
           const products= context.rootGetters['prods/products']
           const product=products.find(prod=>prodId===prod.id);
            context.commit('addProductToCart', product)
        },
        removeFromCart(context, payload) {
            context.commit('removeProductFromCart', payload)
        }
    },
    getters: {
        cartItems(state) {
            return state.items
        },
        cartTotal(state) {
            return state.total
        },
        cartQuantity(state) {
            return state.qty
        }
    }
}