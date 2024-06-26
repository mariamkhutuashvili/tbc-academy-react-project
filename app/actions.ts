// import { AUTH_COOKIE_KEY } from "../constants";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function login(username, password) {
//   "use server";

//   const response = await fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   });

//   const user = await response.json();

//   if (user.token) {
//     const cookieStore = cookies();
//     cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));
//   } else {
//     throw new Error(user.message);
//   }
// }

// export async function logout() {
//   "use server";
//   const cookieStore = cookies();

//   cookieStore.delete(AUTH_COOKIE_KEY);
//   redirect("/login");
// }

"use server";

import { revalidatePath } from "next/cache";
import {
  deleteUserById,
  // createUser,
  updateUserById,
  getUserId,
  EditProfile,
  deleteBlogById,
  createBlog,
  updateBlogById,
  deleteEntryById,
  createContactForm,
  createProduct,
  editProduct,
  deleteProductById,
  createReview,
  deleteReviewById,
  updateReviewById,
} from "./api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function changeLanguage() {
  const cookieStore = cookies();
  let curr = cookieStore.get("Next-Locale")?.value || "en";

  const newLocale = curr === "en" ? "ka" : "en";
  cookieStore.set("Next-Locale", newLocale);
}

// Users

// export async function createUserAction(userData: UserData) {
//   const { name, email } = userData;
//   revalidatePath("/admin");
//   createUser(name, email);
// }

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};

export async function updateUserAction(id: number, userData: UserData) {
  const { name, email } = userData;
  revalidatePath("/admin");
  updateUserById(id, name, email);
}

// Blogs

export async function createAddBlogAction(blogData: AddBlogData) {
  const { title, description, photo } = blogData;
  revalidatePath("/blog");
  revalidatePath("/admin");
  createBlog(title, description, photo);
}

export const deleteBlog: (id: number) => Promise<void> = async (id: number) => {
  await deleteBlogById(id);
  revalidatePath("/admin");
  revalidatePath("/blog");
};

export async function updateBlog(blog: PostData) {
  const { id, title, description, photo } = blog;
  revalidatePath("/admin");
  revalidatePath("/blog");
  updateBlogById(id, title, description, photo);
}

// Products

export async function createAddProductAction(productData: Products) {
  const {
    title,
    description,
    price,
    discountprice,
    stock,
    category,
    brand,
    photo_gallery,
  } = productData;

  await createProduct(
    title,
    description,
    price,
    discountprice,
    stock,
    category,
    brand,
    photo_gallery
  );
}

export async function editProductAction(productData: ProductFromVercel) {
  const {
    id,
    title,
    description,
    price,
    discountprice,
    stock,
    category,
    brand,
    photo_gallery,
  } = productData;
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/admin");
  editProduct(
    id,
    title,
    description,
    price,
    discountprice,
    stock,
    category,
    brand,
    photo_gallery
  );
}

export const deleteProduct: (id: number) => Promise<void> = async (
  id: number
) => {
  await deleteProductById(id);
  revalidatePath("/products");
  revalidatePath("/admin");
};

// Cart

export const handleAddToCart = async (productId: string) => {
  "use server";

  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-to-cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: 1,
        }),
      }
    );
    revalidatePath("/cart");
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const handleDecrement = async (productId: string) => {
  "use server";

  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/decrement-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: 1,
        }),
      }
    );

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const handleRemoveProductFromCart = async (productId: string) => {
  "use server";

  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/remove-product`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      }
    );

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const handleClearCart = async () => {
  "use server";

  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/empty-cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

// Checkout

export const checkout = async (filteredProducts: any[], user: any) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ products: filteredProducts, user }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.url) {
        redirect(response.url);
      }
    });
};

export async function createRefund(charge: string) {
  revalidatePath("/admin");
  await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/create-refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ charge }),
  });
}

// Profile

export async function editProfileInfo(formData: ProfileData) {
  const { userSub, nickname, phone, address } = formData;
  revalidatePath("/profile");
  EditProfile(userSub, nickname, phone, address);
}

// Contact

export async function createContactAction(formData: ContactData) {
  const { name, email, phone, message } = formData;
  revalidatePath("/admin");
  createContactForm(name, email, phone, message);
}

export const deleteEntry: (id: number) => Promise<void> = async (
  id: number
) => {
  await deleteEntryById(id);
  revalidatePath("/admin");
};

// Reviews

export async function createAddReviewAction(reviewData: ReviewData) {
  const { user_id, product_id, star, comment } = reviewData;
  revalidatePath(`/products/${product_id}`);
  createReview(user_id, product_id, star, comment);
}

export const deleteReview: (id: number) => Promise<void> = async (
  id: number
) => {
  await deleteReviewById(id);
  revalidatePath("/products");
  revalidatePath("/admin");
};

export async function createEditReviewAction(reviewData: EditReviewData) {
  const { id, user_id, product_id, star, comment } = reviewData;
  revalidatePath("/admin");
  revalidatePath("/profile/reviews");
  updateReviewById(id, user_id, product_id, star, comment);
}
