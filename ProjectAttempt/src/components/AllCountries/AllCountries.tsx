import React, { useState, useEffect } from 'react';
import { apiURL } from '../util/api';
import SearchInput from '../Search/SearchInput';
import FilterCountry from '../FilterCountry/FilterCountry';

import { Link } from 'react-router-dom';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string;
}

const AllCountries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();

      console.log(data);

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  const getCountryByName = async (countryName: string) => {
    try {
      // Clear the error message and set loading to true for a new search
      setError('');
      setIsLoading(true);

      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) {
        throw new Error('No Country to show for this Search!');
      }

      const data = await res.json();

      if (data.length === 0) {
        setError('Country not found');
      } else {
        setCountries(data);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  const getCountryByRegion = async (regionName: string) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error('Failed.........');

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all_country_wrapper">
      <div className="country_top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>

      <div className="country_bottom">
        {isLoading && <h4>Loading.........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {!isLoading && !error && countries?.length > 0 && (
          <>
            {countries.map((country, index) => (
             <Link to={`/country/${country.name.common}`}>
              <div key={index} className="country_card">
                <div className="country_img">
                  <img src={country.flags?.png} alt="" />
                </div>
                <div className="country_data">
                  <h3>{country.name?.common}</h3>
                  <h6>
                    {""}
                    Population:{""} {new Intl.NumberFormat().format(country.population)}
                    </h6>
                  <h6>Region: {country.region}</h6>
                  <h6>Capital: {country.capital}</h6>
                </div>
              </div>
             </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllCountries;
