//products page

interface ProductFromVercel {
  id: number;
  title: string;
  description: string;
  price: number;
  discountprice: number;
  stock: number;
  category: string;
  brand: string;
  photo_gallery: Gallery[];
}

interface ActiveProductFromVercel {
  id: number;
  title: string;
  description: string;
  price: number;
  discountprice: number;
  stock: number;
  category: string;
  brand: string;
  photo_gallery: Gallery[];
  quantity: number;
}

interface Products {
  title: string;
  description: string;
  price: number;
  discountprice: number;
  stock: number;
  category: string;
  brand: string;
  photo_gallery: Gallery[];
}

interface Gallery {
  id: number;
  img_url: string;
  name: string;
}

interface ProductsDataProps {
  filter: any;
  product: ProductFromVercel[];
}

interface Product {
  id: string;
  title: string;
}

interface SortProps {
  isSorted: boolean;
  onToggleSort: () => void;
}

//product & blog page

interface MetaDataProps {
  params: {
    id: number;
    locale: string;
  };
}

//product page

interface Review {
  id: number;
  name: string;
  email: string;
  user_id: number;
  star: number;
  comment: string;
  product_id: number;
}

// blog page

interface BlogData {
  id: number;
  title: string;
  description: string;
  photo: string;
  date_added: string;
}

interface AddBlogData {
  title: string;
  description: string;
  photo: string | undefined;
}

interface ArticleProps {
  id: number;
  title: string;
  date: string;
  photo: string;
}

interface PostData {
  id: number;
  title: string;
  description: string;
  photo: string;
}

//profile page

interface ProfileData {
  userSub: string;
  nickname: string;
  phone: string;
  address: string;
}

//contact page

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

//admin page

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EntryData {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface UserData {
  name: string;
  email: string;
}

interface Order {
  id: string;
  metadata: {
    name: string;
    id: string;
    address: string;
    phone: string;
    comment: string;
  };
  amount: number;
  latest_charge: {
    id: string;
    amount: number;
    refunded: boolean;
    receipt_url: string;
  };
}

//cart page

interface Cart {
  id: number;
  user_id: number;
  products: {
    [key: string]: number;
  };
  added_on: string;
}

interface QuantityProps {
  id: string;
  quantity: number;
  price: number;
}
