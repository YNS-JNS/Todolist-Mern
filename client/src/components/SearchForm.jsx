import { useState } from 'react';

const SearchForm = ({ fetchTasksByTitle }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchTasksByTitle(searchTerm);


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTasksByTitle(searchTerm);
    }

    const handleClear = () => {
        setSearchTerm('');
        fetchTasksByTitle('');
    }

    return (
        <div className="flex  w-1/2">
            <div className='w-3/4  max-w-md mx-auto mt-4 '>
                <form onSubmit={handleSubmit}>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="search"
                            id="search"
                            placeholder="Search something.."
                            value={searchTerm}
                            onChange={handleChangeSearch}
                        />
                    </div>
                </form>
            </div>
            <div className='w-1/4 text-right mt-4 ml-4'>
                <button className="bg-white px-6 text-lg font-semibold py-2 rounded-md drop-shadow-2xl"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default SearchForm;