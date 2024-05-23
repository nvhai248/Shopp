export default function ToTalCart() {
  return (
    <div className="w-1/3 ml-10">
      <div className="mb-4 bg-white shadow-md rounded-none">
        <div className="py-3 px-4 bg-gray-100 rounded-none">
          <h5 className="text-xl font-semibold mb-0">Summary</h5>
        </div>
        <div className="p-4">
          <ul className="list-none">
            <li className="flex justify-between py-2 border-b">
              <span>Products</span>
              <span>$53.98</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>Gratis</span>
            </li>
            <li className="flex justify-between py-2">
              <div>
                <strong>Total amount</strong>
                <p className="mb-0 text-sm">(including VAT)</p>
              </div>
              <span>
                <strong>$53.98</strong>
              </span>
            </li>
          </ul>
          <button className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-none hover:bg-blue-700 transition-colors duration-300">
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
