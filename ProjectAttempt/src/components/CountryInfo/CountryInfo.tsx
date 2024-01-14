import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiURL } from '../util/api';

interface Country {
  flags: { png: string };
  name: { common: string };
  population: number;
  region: string;
  subRegion: string;
  capital: string; // Add this line if necessary
}

const CountryInfo: React.FC = () => {
  const [country, setCountry] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { countryName } = useParams<{ countryName: string }>();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);
    
        if (!res.ok) throw new Error('Country not found');
    
        const data: Country[] = await res.json();
    
        setCountry(data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message as string);
      }
    };
    
    getCountryByName();
  }, [countryName]);

  return (
    <div className="country_info_wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && <p>{error}</p>}

      {country.map((country, index) => (
        <div className="country_info_container" key={index}>
          <div className="country_info-img">
            <img src={country.flags.png} alt="" />
          </div>
          <div className="country_info">
            <h3>{country.name.common}</h3>
            <div className="country_info-left">
              <h5>
                Population: <span>{new Intl.NumberFormat().format(country.population)}</span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subRegion}</span>
              </h5>
              {/* Check if 'capital' property is present in the API response before rendering */}
              {country.capital && (
                <h5>
                  Capital: <span>{country.capital}</span>
                </h5>
              )}
            </div>
          </div>
        </div>
      ))}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CountryInfo;
