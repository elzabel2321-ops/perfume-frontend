"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { adminApi } from "@/lib/adminApi";

type Product = {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  stock: number;
};

const emptyForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
};

export default function ProductsPage() {
  const { data: session, status } = useSession();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // TOKEN
  // ==========================================

  const token = session?.accessToken;

  // ==========================================
  // READ
  // ==========================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      const result =
        await adminApi.products(token);

      setProducts(
        result.products || []
      );

    } catch (error: any) {
      console.error(error);

      setError(
        error.message ||
          "Failed to load products"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadProducts();
    }
  }, [status, token]);

  // ==========================================
  // FORM INPUT
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // CREATE / UPDATE
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      let imageUrl = form.image;

      if (imageFile && token) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult?.url) {
          throw new Error(
            uploadResult?.message || "Failed to upload image."
          );
        }

        imageUrl = uploadResult.url;
      }

      const productData = {
        name: form.name,
        brand: form.brand,
        description: form.description,
        price: Number(form.price),
        image: imageUrl,
        category: form.category,
        stock: Number(form.stock),
      };

      // UPDATE
      if (editingId) {
        await adminApi.updateProduct(
          editingId,
          productData,
          token
        );
      }

      // CREATE
      else {
        await adminApi.createProduct(
          productData,
          token
        );
      }

      // RESET FORM
      setForm(emptyForm);
      setImageFile(null);
      setEditingId(null);
      setShowForm(false);

      // REFRESH PRODUCTS
      await loadProducts();

    } catch (error: any) {
      console.error(error);

      setError(
        error.message ||
          "Failed to save product"
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (
    product: Product
  ) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      brand: product.brand || "",
      description:
        product.description || "",
      price: String(
        product.price ?? ""
      ),
      image: product.image || "",
      category:
        product.category || "",
      stock: String(
        product.stock ?? ""
      ),
    });

    setShowForm(true);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) return;

    try {
      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      await adminApi.deleteProduct(
        id,
        token
      );

      await loadProducts();

    } catch (error: any) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete product"
      );
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (
    status === "loading" ||
    loading
  ) {
    return (
      <div className="p-8">
        Loading products...
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="p-8">

      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage your perfume shop
          </p>
        </div>

        {/* CREATE BUTTON */}

        <button
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setImageFile(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          + Add Product
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
          CREATE / UPDATE FORM
          ===================================== */}

      {showForm && (
        <div className="mb-8 rounded-xl border bg-white p-6">

          <h2 className="mb-6 text-xl font-bold">
            {editingId
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-2"
          >

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="rounded-lg border p-3"
            />

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product image
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setImageFile(file);
                }}
                className="w-full rounded-lg border p-3"
              />
              {(imageFile || form.image) && (
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : form.image
                  }
                  alt="Product preview"
                  className="h-24 w-24 rounded-lg object-cover"
                />
              )}
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="rounded-lg border p-3 md:col-span-2"
              rows={4}
            />

            {/* BUTTONS */}

            <div className="flex gap-3 md:col-span-2">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Create Product"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* =====================================
          READ — PRODUCTS TABLE
          ===================================== */}

      {products.length === 0 ? (

        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-gray-500">
            No products found.
          </p>
        </div>

      ) : (

        <div className="overflow-hidden rounded-xl border bg-white">

          <table className="w-full">

            <thead>
              <tr className="border-b bg-gray-50 text-left">

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Price
                </th>

                <th className="p-4">
                  Stock
                </th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {products.map(
                (product) => (

                  <tr
                    key={product._id}
                    className="border-b"
                  >

                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : null}
                        <span>{product.name}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      {product.price} ETB
                    </td>

                    <td className="p-4">
                      {product.stock}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">

                      <div className="flex gap-2">

                        {/* UPDATE */}

                        <button
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                          className="rounded-lg border px-3 py-2 text-sm"
                        >
                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}