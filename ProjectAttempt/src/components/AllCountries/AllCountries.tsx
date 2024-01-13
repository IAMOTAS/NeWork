import React, { useState, useEffect } from 'react';
import { apiURL } from '../util/api';

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
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all_country_wrapper">
      <div className="country_top"></div>

      <div className="country_bottom">
        {isLoading && !error && <h4>Loading.........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country, index) => (
          <div key={index} className="country_card">
            <div className="country_img">
              <img src={country.flags?.png} alt="" />
            </div>
            <div className="country_data">
              <h3>{country.name?.common}</h3>
              <h6>Population: {country.population}</h6>
              <h6>Region: {country.region}</h6>
              <h6>Capital: {country.capital}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
