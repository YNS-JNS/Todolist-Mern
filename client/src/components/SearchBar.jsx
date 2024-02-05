import Filter from './Filter'
import SearchForm from './SearchForm'

const SearchBar = () => {
    return (

        <div className="w-full flex justify-between">
            <div className="w-1/4">
                <Filter />
            </div>

            <div className=' w-3/4 flex justify-end'>
                <SearchForm />
            </div>
        </div>
    )
}

export default SearchBar