import { useEffect, useState } from "react";
import { Countries } from "./components/Countries";
import { Country } from "./types/Country";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";

function App() {
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesPerPage, setCountriesPerPage] = useState<Country[]>([]);
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => res.json())
      .then((data) => {
        setInitialCountries(data);
        setCountries(data);
      });
  }, [itemsPerPage]);

  useEffect(() => {
    console.log(countries);

    setCountriesPerPage(
      countries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [countries, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const sortByArea = () => {
    const lithuania = initialCountries.find((c) => c.name === "Lithuania");

    if (lithuania) {
      setCountries(
        [...initialCountries]
          .filter((a) => a.area < lithuania.area)
          .slice(0, itemsPerPage)
      );
    }
  };

  const sortByNameDesc = () => {
    const sortedCountries = [...initialCountries].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setCountries(sortedCountries);
    setOrder("desc");
  };

  const sortByNameAsc = () => {
    const sortedCountries = [...initialCountries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
    setOrder("asc");
  };

  const filterByRegion = () => {
    setCountries(
      [...countries.filter((i) => i.region === "Oceania")].slice(
        0,
        itemsPerPage
      )
    );
  };

  const resetFilters = () => {
    setCountries(initialCountries.slice(0, itemsPerPage));
    setOrder("asc");
  };

  return (
    <div className="app">
      <Header
        sortByDesc={sortByNameDesc}
        sortByAsc={sortByNameAsc}
        filterByArea={sortByArea}
        filterByRegion={filterByRegion}
        resetFilters={resetFilters}
        order={order}
        setItemsPerPage={setItemsPerPage}
      />
      <Countries countries={countriesPerPage} />
      {countries.length >= 10 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={initialCountries.length}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
}

export default App;
