import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// import { heroesCreated } from "../../actions";
import { heroesCreated } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
  const [heroesName, setHeroesName] = useState("");
  const [heroesDescr, setHeroesDescr] = useState("");
  const [heroesElement, setHeroesElement] = useState("");

  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newHeroes = {
      id: uuidv4(),
      name: heroesName,
      description: heroesDescr,
      element: heroesElement,
    };


    request("http://localhost:3005/heroes", "POST", JSON.stringify(newHeroes))
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(heroesCreated(newHeroes)))
      .catch((err) => console.log(err));

    setHeroesName("");
    setHeroesDescr("");
    setHeroesElement("");
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Загрузка элементов</option>;
    } else if (status === "error") {
      return <option>Ошибка загрузки</option>;
    }

    // Если фильтры есть, то рендерим их
    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // Один из фильтров нам тут не нужен
        // eslint-disable-next-line
        if (name === "all") return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroesName}
          onChange={(e) => setHeroesName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          value={heroesDescr}
          onChange={(e) => setHeroesDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroesElement}
          onChange={(e) => setHeroesElement(e.target.value)}
        >
          <option value="">Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
