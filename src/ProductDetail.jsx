import React from 'react'
import { useParams } from 'react-router-dom'
import products from './productDetails'

function ProductDetail() {
    const { id } = useParams()
    const product = products.find(p => p.id === parseInt(id))

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{width: '300px'}} />
            <p>Price: ₹{product.price}</p>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
        </div>
    )
}

export default ProductDetail