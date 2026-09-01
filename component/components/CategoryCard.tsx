import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.name}`}>
      <div className="group relative h-48 cursor-pointer overflow-hidden rounded-lg">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-4 transition group-hover:bg-black/50">
          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
          <p className="text-sm text-[#F7E9C1]">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
