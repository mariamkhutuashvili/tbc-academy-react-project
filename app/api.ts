// Users

import { getSession } from "@auth0/nextjs-auth0";

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`,
    {
      cache: "no-store",
    }
  );
  const { users } = await response.json();
  return users?.rows;
}

// export async function createUser(name: string, email: string) {
//   return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-user`, {
//     method: "POST",
//     body: JSON.stringify({ name, email }),
//   });
// }

export async function deleteUserById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-user/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateUserById(id: number, name: string, email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true }; // Return success indicator
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Blogs

export async function createBlog(
  title: string,
  description: string,
  photo: string | undefined
) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-blog`, {
    method: "POST",
    body: JSON.stringify({ title, description, photo }),
  });
}

export async function deleteBlogById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-blog/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateBlogById(
  id: number,
  title: string,
  description: string,
  photo: string | undefined
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-blog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, photo }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function getBlogs() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs`,
    {
      cache: "no-store",
    }
  );
  const { blogs } = await response.json();
  return blogs?.rows;
}

export async function getBlogDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const blogDetail = data.blogs?.rows ? data.blogs.rows[0] : null;

  return blogDetail;
}

// Products

export async function createProduct(
  title: string,
  description: string,
  price: number,
  discountprice: number,
  stock: number,
  category: string,
  brand: string,
  photo_gallery: { id: number; img_url: string }[] | undefined
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        discountprice,
        stock,
        category,
        brand,
        photo_gallery,
      }),
    }
  );
}

export async function editProduct(
  id: number | undefined,
  title: string,
  description: string,
  price: number,
  discountprice: number,
  stock: number,
  category: string,
  brand: string,
  photo_gallery: { id: number; img_url: string }[] | undefined
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-product/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        price,
        discountprice,
        stock,
        category,
        brand,
        photo_gallery,
      }),
    }
  );
}

export async function deleteProductById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-product/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function getProductDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const product = data.products?.rows ? data.products.rows[0] : null;
  const reviews = data.reviews?.rows ? data.reviews.rows : null;
  return { product, reviews };
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products`,
    {
      cache: "no-store",
    }
  );
  const { products } = await response.json();
  return products?.rows;
}

// Cart

export async function getUserCart() {
  const id = await getUserId();
  if (!id) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-cart/${id}`,
    {
      cache: "no-store",
    }
  );
  const carts = await response.json();

  const [cart] = carts.cart.rows;

  return cart;
}

// Profile

export async function getUserId() {
  const session = await getSession();
  const user = session?.user;
  const subId = user?.sub;

  const userSubId = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-user-id/${subId}`,
    {
      cache: "no-store",
    }
  );
  const userSerialId = await userSubId.json();
  const userId = userSerialId.usersId;

  return userId;
}

export async function getUserPicture() {
  const session = await getSession();
  const user = session?.user;
  const subId = user?.sub;
  const userPicture = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-user-picture/${subId}`,
    {
      cache: "no-store",
    }
  );
  const userPictureInfo = await userPicture.json();
  const imageUrl = userPictureInfo.userPicture.rows[0].picture;
  return imageUrl;
}

export async function uploadUserPicture(url: string, sub: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-user-picture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blobUrl: url,
        userSub: sub,
      }),
    }
  );
}

export async function EditProfile(
  userSub: string,
  nickname: string,
  phone: string,
  address: string
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/edit-profile-info`,
    {
      method: "POST",
      body: JSON.stringify({ userSub, nickname, phone, address }),
    }
  );
}

export async function getUserInfo() {
  const id = await getUserId();

  if (!id) {
    return null;
  }

  const userSubId = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users/${id}`,
    {
      cache: "no-store",
    }
  );

  const userInfo = await userSubId.json();

  if (
    !userInfo ||
    !userInfo.user ||
    !userInfo.user.rows ||
    userInfo.user.rows.length === 0
  ) {
    return null;
  }

  const userDetail = userInfo.user.rows[0];
  return userDetail;
}

// Contact

export async function createContactForm(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-contact-form`,
    {
      method: "POST",
      body: JSON.stringify({ name, email, phone, message }),
    }
  );
}

export const getFormEntries = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-form-entries`,
    {
      cache: "no-store",
    }
  );
  const entries = await res.json();
  return entries?.formEntries?.rows;
};

export async function deleteEntryById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-form-entries/${id}`,
    {
      method: "DELETE",
    }
  );
}

// Orders

export const getOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/orders`, {
    cache: "no-store",
  });
  const orders = await res.json();
  return orders;
};

// Reviews

export async function createReview(
  user_id: number | undefined,
  product_id: number,
  star: number,
  comment: string
) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-review`,
    {
      method: "POST",
      body: JSON.stringify({ user_id, product_id, star, comment }),
    }
  );
}

export const getReviews = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-reviews`,
    {
      cache: "no-store",
    }
  );
  const reviews = await res.json();
  return reviews;
};

export async function deleteReviewById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-review/${id}`,
    {
      method: "DELETE",
    }
  );
}

export const getReviewsForUser = async () => {
  const id = await getUserId();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-reviews/${id}`,
    {
      cache: "no-store",
    }
  );
  const reviews = await res.json();
  return reviews;
};

export async function updateReviewById(
  id: number,
  user_id: number,
  product_id: number,
  star: number,
  comment: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-review/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, product_id, star, comment }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
