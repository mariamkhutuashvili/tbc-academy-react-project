import { getSession } from "@auth0/nextjs-auth0";
import { ContactData } from "../components/contactForm/ContactForm";

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

export async function getUserId() {
  const session = await getSession();
  const user = session?.user;
  const subId = user?.sub;

  const userSubId = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-user-id/${subId}`,
    {
      cache: "no-store",
    }
  );
  const userSerialId = await userSubId.json();
  const userId = userSerialId.usersId;
  console.log(userId);

  return userId;
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

export async function EditProfile(
  userSub: string,
  nickname: string,
  phone: string,
  address: string
) {
  return await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/edit-profile-info",
    {
      method: "POST",
      body: JSON.stringify({ userSub, nickname, phone, address }),
    }
  );
}

export async function getUserInfo() {
  const id = await getUserId();
  const userSubId = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-users/${id}`,
    {
      cache: "no-store",
    }
  );

  const userInfo = await userSubId.json();
  const userDetail = userInfo.user.rows[0];
  return userDetail;
}

export async function createContactForm(formData: ContactData) {
  const { name, email, phone, message } = formData;

  return await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-contact-form",
    {
      method: "POST",
      body: JSON.stringify({ name, email, phone, message }),
    }
  );
}

export async function getBlogs() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-blogs"
  );
  const { blogs } = await response.json();
  return blogs?.rows;
}

export async function getBlogDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs/${id}`
  );
  const data = await response.json();
  const blogDetail = data.blogs?.rows ? data.blogs.rows[0] : null;

  return blogDetail;
}
