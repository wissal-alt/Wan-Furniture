import { Product } from '@/lib/csvLoader';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.imageUrl && product.imageUrl.trim() !== '';

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100/50">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-amber-50 to-white">
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center border-2 border-amber-300/50 border-dashed">
                    <span class="text-amber-600 font-medium subtext">Image coming soon</span>
                  </div>
                `;
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-2 border-amber-300/50 border-dashed">
            <span className="text-amber-600 font-medium subtext">Image coming soon</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-amber-700">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
