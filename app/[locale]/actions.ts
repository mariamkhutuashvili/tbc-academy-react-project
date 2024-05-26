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

"use server"

import { revalidatePath } from "next/cache";
import { deleteUserById, createUser, updateUserById } from "../api";

interface UserData {
    name: string;
    email: string;
    age: number;
  }

export async function createUserAction(userData: UserData) {
  const {name,email,age} = userData
  revalidatePath("/admin")
   createUser(name,email,age)
}

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};

export async function updateUserAction(id:number,userData:UserData){
  const {name,email,age} = userData
  revalidatePath("/admin")
  updateUserById(id,name,email,age)

}

export const handleAddToCart = async (productId: string) => {
  "use server";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-to-cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 7,
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/decrement-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 7,
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/remove-product`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 7,
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/empty-cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 7,
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
