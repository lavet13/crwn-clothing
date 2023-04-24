import { Fragment, useContext, useState, useEffect } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

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
      <CategoryTitle>{category}</CategoryTitle>
      <CategoryContainer>
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
