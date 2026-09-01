import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E6D8BE] bg-[#111111] text-[#F6EEDC]">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Main footer content */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand information */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-[#C9A038]">
              A ROMANOVA
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
              Discover premium luxury perfumes for every occasion.
              Quality, elegance, and a unique fragrance for every personality.
            </p>
          </div>

          {/* Quick navigation links */}
          <div>
            <h3 className="mb-4 font-semibold text-[#C9A038]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              {/* Home link */}
              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#C9A038]"
                >
                  Home
                </Link>
              </li>

              {/* Company link */}
              <li>
                <Link
                  href="/company"
                  className="transition hover:text-[#C9A038]"
                >
                  Company
                </Link>
              </li>

              {/* Products link */}
              <li>
                <Link
                  href="/products"
                  className="transition hover:text-[#C9A038]"
                >
                  Products
                </Link>
              </li>

              {/* Cart link */}
              <li>
                <Link
                  href="/cart"
                  className="transition hover:text-[#C9A038]"
                >
                  Cart
                </Link>
              </li>

              {/* Profile link */}
              <li>
                <Link
                  href="/profile"
                  className="transition hover:text-[#C9A038]"
                >
                  Profile
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="mb-4 font-semibold text-[#C9A038]">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm text-gray-300">

              {/* Company email */}
              <p>
                Email: support@aromanova.com
              </p>

              {/* Additional email */}
              <p>
                Email: elsu2321@gmail.com
              </p>

              {/* Company phone number */}
              <p>
                Phone: +251 964 40 24 17
              </p>

              {/* Company location */}
              <p>
                Addis Ababa, Ethiopia
              </p>

            </div>
          </div>

        </div>

        {/* Copyright section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">

          © {new Date().getFullYear()} A ROMANOVA.
          All rights reserved.

        </div>

      </div>
    </footer>
  );
}