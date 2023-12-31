import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Components
import FormContainer from '../../components/common/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
// Slices
import { saveShippingAddress } from '../../slices/cartSlice';


function ShippingScreen() {
    // Get the shippingAddress global state
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Populate the component local state based on the results of the global state if any
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const isFormFilled = address && city && postalCode && country;

    // Initialization
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Update the global state
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            {/* Address */}
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Insert address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {/* City */}
            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Insert city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {/* Postal Code */}
            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Insert postal code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {/* Country */}
            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Insert country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {/* Submit Button */}
            <Button
                type='submit'
                variant='primary'
                className='my-2'
                disabled={!isFormFilled}
            >
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen