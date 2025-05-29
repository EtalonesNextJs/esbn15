import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Тип одной вакансии
export interface Vacancy {
  _id: string;
  title: string;
  description: string;
  // можешь расширить другими полями: salary, imageFB и т.д.
}

// Тип состояния — словарь по категориям
interface VacanciesState {
  [key: string]: Vacancy[] | undefined;
}

// Тип значений, которые предоставляет контекст
interface VacancyContextType {
  vacancies: VacanciesState;
  loadVacancies: (type: string, vacanciesList: Vacancy[]) => void;
  loadFromCacheOrFetch: (
    type: string,
    fetchFunc: () => Promise<Vacancy[]>
  ) => void;
}

// Контекст с дефолтными значениями
const VacancyContext = createContext<VacancyContextType>({
  vacancies: {},
  loadVacancies: () => {},
  loadFromCacheOrFetch: () => {},
});

// Провайдер контекста
export const VacancyProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, setVacancies] = useState<VacanciesState>({});

  // Основная функция обновления состояния
  const loadVacancies = (type: string, vacanciesList: Vacancy[]) => {
    setVacancies((prev) => ({
      ...prev,
      [type]: vacanciesList,
    }));
  };

  // Загрузка либо из localStorage, либо из fetch-функции
  const loadFromCacheOrFetch = async (
    type: string,
    fetchFunc: () => Promise<Vacancy[]>
  ) => {
    try {
      const cached = localStorage.getItem("vacancies");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed[type] && Array.isArray(parsed[type])) {
          loadVacancies(type, parsed[type]);
          return; // Загружено из localStorage — fetch не нужен
        }
      }
    } catch (err) {
      console.warn("Ошибка чтения кэша:", err);
    }

    // Если в localStorage ничего нет — делаем fetch
    try {
      const data = await fetchFunc();
      loadVacancies(type, data);
    } catch (err) {
      console.error("Ошибка загрузки вакансий из API:", err);
    }
  };

  // Сохраняем вакансии в localStorage при каждом изменении
  useEffect(() => {
    try {
      if (Object.keys(vacancies).length > 0) {
        localStorage.setItem("vacancies", JSON.stringify(vacancies));
      }
    } catch (err) {
      console.error("Ошибка записи в localStorage:", err);
    }
  }, [vacancies]);

  return (
    <VacancyContext.Provider
      value={{ vacancies, loadVacancies, loadFromCacheOrFetch }}
    >
      {children}
    </VacancyContext.Provider>
  );
};

// Хук для доступа к контексту
export const useVacancies = () => useContext(VacancyContext);
