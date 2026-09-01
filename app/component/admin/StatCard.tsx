type Props = {
  title: string;
  value: string;
  icon: string;
  description?: string;
  href?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  description,
  href,
}: Props) {
  const content = (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#2A2421]">{value}</h3>
          {description && (
            <p className="mt-2 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F3EC] text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );

  if (!href) return content;
  return <a href={href}>{content}</a>;
}