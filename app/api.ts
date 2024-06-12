import { getSession } from "@auth0/nextjs-auth0";

export async function getUsers() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-users"
  );
  const { users } = await response.json();
  return users?.rows;
}

export async function createUser(name: string, email: string) {
  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/create-user", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
}

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

export async function getProductDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products/${id}`
  );
  const data = await response.json();
  const product = data.products?.rows ? data.products.rows[0] : null;
  return product;
}

export async function getProducts() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-products"
  );
  const { products } = await response.json();
  return products?.rows;
}

export async function getUserCart(userId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-cart/${userId}`,
    {
      cache: "no-store",
    }
  );
  const carts = await response.json();

  const [cart] = carts.cart.rows;

  return cart;
}

export async function getUserPicture() {
  const session = await getSession();
  const user = session?.user;
  const subId = user?.sub;
  const userPicture = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-user-picture/${subId}`,
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
