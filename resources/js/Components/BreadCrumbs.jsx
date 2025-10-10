import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mt-4" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#1e4692] text-#0F62FE transition-colors duration-200"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-[#0F62FE] font-medium">{item.name}</span>
            )}
            {!isLast && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
