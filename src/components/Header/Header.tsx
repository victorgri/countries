import { Button } from "react-bootstrap"
import './Header.scss'

type Props = {
  filterByArea: () => void;
  filterByRegion: () => void;
  sortByAsc: () => void;
  sortByDesc: () => void;
  resetFilters: () => void;
  order: string;
  setItemsPerPage: (itemsPerPage: number) => void; // Оновлений тип setItemsPerPage
};

export const Header: React.FC<Props> = ({
  filterByArea,
  filterByRegion,
  sortByAsc,
  sortByDesc,
  resetFilters,
  order,
  setItemsPerPage,
}) => {
  return (
    <header className="header">
      <div className="header__top">
        <span className="header__filters--title">Set order:</span>
        {order === "asc" ? (
          <Button
            variant="outline-danger hover"
            onClick={sortByDesc}
            className="header__sort"
          >
            desc
          </Button>
        ) : (
          <Button
            variant="outline-success hover"
            onClick={sortByAsc}
            className="header__sort"
          >
            asc
          </Button>
        )}
      </div>

      <div className="header__filters">
        <div className="header__filters--left">
          <span className="header__filters--title">Filter by:</span>
          <Button
            variant="primary"
            className="header__filters--btn"
            onClick={filterByArea}
          >
            Area
          </Button>
          <Button
            variant="success"
            className="header__filters--btn"
            onClick={filterByRegion}
          >
            Region
          </Button>
        </div>

        <Button
          variant="danger"
          className="header__filters--btn"
          onClick={() => {
            setItemsPerPage(10);
            resetFilters();
          }}
        >
          Reset
        </Button>
      </div>
    </header>
  );
};
