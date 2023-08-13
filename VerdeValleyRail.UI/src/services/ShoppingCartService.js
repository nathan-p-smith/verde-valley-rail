const LOCAL_STOARGE_NAME = 'vv-cart';

var shoppingCartService = {

    getCart: function(){

        var cartData = localStorage.getItem(LOCAL_STOARGE_NAME);

        var cart = [];        

        if(!cartData){
            
            localStorage.setItem(LOCAL_STOARGE_NAME, JSON.stringify(cart));            
            return cart;

        }

        return JSON.parse(cartData);
    },

    upsertToCart: function(booking){

        var cart = this.getCart();

        var existingBooking = cart.find((t) => { return t.tripId == booking.tripId });

        if(existingBooking){
            Object.assign(existingBooking, booking);
            console.log(existingBooking);
        }
        else
            cart.push(booking);

        this.saveCart(cart);

    },

    removeFromCart: function(tripId){

        var cart = this.getCart();

        var tripIndex = cart.findIndex((t) => { return t.tripId == tripId });

        cart.splice(tripIndex, 1);

        this.saveCart(cart);

        return cart;
    },

    saveCart: function(cart){

        localStorage.setItem(LOCAL_STOARGE_NAME, JSON.stringify(cart));

    }

}

export default shoppingCartService;