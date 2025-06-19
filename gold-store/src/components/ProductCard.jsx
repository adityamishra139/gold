export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-yellow-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <div className="text-yellow-700 font-bold">${product.price}</div>
    </div>
  );
}
