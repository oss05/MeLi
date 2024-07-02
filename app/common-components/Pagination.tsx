const Pagination = () => {
    return ( 
        <nav className="flex justify-center mt-8">
        <ul className="flex list-none">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border ${
                    currentPage === number
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  {number}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
     );
}
 
export default Pagination;