import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';
import SortBy from './SortBy';

const sortByAIRank = [
  { value: 'airank-asc', label: 'Sort by AI Rank (ascending)' },
  { value: 'airank-desc', label: 'Sort by AI Rank (descending)' },
];

const sortByPlayerCount = [
  { value: 'playercount-asc', label: 'Sort by Player Count (ascending)' },
  { value: 'playercount-desc', label: 'Sort by Player Count (descending)' },
];

const sortByPrice = [
  { value: 'price-asc', label: 'Sort by Price (ascending)' },
  { value: 'price-desc', label: 'Sort by Price (descending)' },
];

const sortByDuration = [
  { value: 'duration-asc', label: 'Sort by Duration (ascending)' },
  { value: 'duration-desc', label: 'Sort by Duration (descending)' },
];

const sortByVotes = [
  { value: 'votes-asc', label: 'Sort by Votes (ascending)' },
  { value: 'votes-desc', label: 'Sort by Votes (descending)' },
];

const sortByMap = {
  airank: sortByAIRank,
  playercount: sortByPlayerCount,
  price: sortByPrice,
  duration: sortByDuration,
  votes: sortByVotes,
};

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    searchParams.set('sortBy', `${value}-asc`);
    setSearchParams(searchParams);
  }

  return (
    <div className="border-grey-100 bg-grey-0 flex grow justify-center gap-2 space-x-2 rounded-sm border p-2 shadow-sm">
      <div className="space-x-2">
        {options.map((option) => (
          <FilterButton
            onClick={() => handleClick(option.value)}
            key={option.value}
            active={option.value === currentFilter}
            disabled={option.value === currentFilter}
          >
            {option.label}
          </FilterButton>
        ))}
      </div>
      <SortBy options={sortByMap[currentFilter]} filter={currentFilter} />
    </div>
  );
}

Filter.propTypes = {
  filterField: PropTypes.string,
  options: PropTypes.array,
};

export default Filter;
