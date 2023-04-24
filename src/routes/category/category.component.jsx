import { Fragment, useContext, useState, useEffect } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    const products = categoriesMap[category];
    setProducts(products);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category}</h2>
      <div className='category-container'>
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default Category;
