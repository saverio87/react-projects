import React, { useContext, useState } from 'react';
import {UserContext} from '../context/user';
import {CartContext} from '../context/cart';
import {useHistory} from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import {CardElement, StripeProvider, Elements, injectStripe} from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
  const {cart, total, clearCart} = useContext(CartContext);
  const {user, showAlert, hideAlert, alert} = useContext(UserContext);
  const history = useHistory();

  // state values

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;
  async function handleSubmit(e) {
    showAlert({msg: "submitting order... please wait"});
    e.preventDefault();
    console.log(props);
    const response = await props.stripe
    .createToken()
    .catch(error => console.log(error));

    // if we get a token back it means everything went
    // smoothly, if we didn't it means there's been an
    // error
    const {token} = response;

    if (token) {
      setError('');
      const {id} = token;
      let order = await submitOrder({name:name, total:total,items:cart,stripeTokenId:id, userToken:user.token});

      if (order) {
        showAlert({msg:"Your order is complete"});
        clearCart();
        history.push('/');
        return;
      } else {
        showAlert({msg: "There was an error with your order", type: "danger"});
      }


    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if(cart.length < 1) return <EmptyCart />;
  return (
    
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
      <h3>
        order total: <span>${total}</span>
      </h3>
      
      {/* single input */}
      <div className="form-control">
        <label htmlFor="name">name</label>
        <input type="text" id="name" value={name} onChange={e => {setName(e.target.value)}}/>
      </div>
      {/* end of single input */}
      {/*card element*/}
      <div className="stripe-input">
        <label htmlFor="card-element">Credit or Debit Card</label>
        <p className="stripe-info">
          Test using this credit card: <span>4322 4322 4322 4322</span>
          <br/>
          enter any 5 digits for the zip code
          <br/>
          enter any 3 digits
        </p>
      </div>
      {/*end of card element*/}

      {/*STRIPE ELEMENTS*/}
      <CardElement className="card-element"></CardElement>
      {/*stripe errors*/}
        {error && <p className="form-empty">{error}</p> }
        
        {/* empty value */}

    {isEmpty ? (<p className="form-empty">please fill out name field</p>
    ) : (
      <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">submit</button>
    )}

      </form>
    </section>

    );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51HsN3sFMtCtUyke9nzzcypi84jsmFCQ7M0eyHwc76uyLJiZn9ueiSkchOS1oSG1FXaet1eDRpyVYzK9PpmNLCR0E00KDv2A6Ev">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  )
}

export default StripeWrapper;
