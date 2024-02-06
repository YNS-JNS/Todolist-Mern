import Filter from './Filter'
import SearchForm from './SearchForm'

const SearchBar = ({fetchTasksByTitle, filteringTasks}) => {

    return (

        <div className="w-full flex justify-between">
            <div className="w-2/5">
                <Filter filteringTasks={filteringTasks} />
            </div>

            <div className=' w-3/5 flex justify-end'>
                <SearchForm fetchTasksByTitle={fetchTasksByTitle} />
            </div>
        </div>
    )
}

export default SearchBar