import ProductList from './ProductList.vue';
import ProductDetails from './ProductDetails.vue';
import ProductForm from '../../components/ProductForm.vue';

export default [
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: ProductForm,
  },
  {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: ProductForm,
    props: true,
  },
];
