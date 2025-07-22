import React from 'react';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      itemCount: 156,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ff19e5884c8c3442f939896c64d90798b?format=webp&width=800'
    },
    {
      id: 2,
      name: 'Cosmetics',
      itemCount: 145,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc66a8c6d1a884446b31366c4f52eaed7?format=webp&width=800'
    },
    {
      id: 3,
      name: 'Shoes',
      itemCount: 189,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2F2bbbb4775bbb45b4807085c054158c37?format=webp&width=800'
    },
    {
      id: 4,
      name: 'Watches',
      itemCount: 134,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ffb094f865b2b4bf989d5b813377937c9?format=webp&width=800'
    },
    {
      id: 5,
      name: 'Belts',
      itemCount: 165,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb3a66b16d7db4a3ba7b701c37f30a6c2?format=webp&width=800'
    }
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="category-info">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">Items ({category.itemCount})</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
