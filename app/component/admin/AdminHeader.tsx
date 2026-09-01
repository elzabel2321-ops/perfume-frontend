"use client";

type Props = {
  onMenuClick: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-2xl hover:bg-gray-100 lg:hidden"
        >
          ☰
        </button>

        <div>
          <h2 className="text-xl font-bold text-[#2A2421]">
            Admin Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Manage your perfume shop
          </p>
        </div>

      </div>

      <div className="flex items-center gap-4">

        <button className="relative rounded-full p-2 text-xl hover:bg-gray-100">
          🔔
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">
            <p className="font-semibold text-[#2A2421]">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A038] font-bold text-white">
            A
          </div>

        </div>

      </div>

    </header>
  );
}