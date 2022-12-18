import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import useApi from "../../hooks/useApi";
import CategoryBox from "./components/categoryBox";

function Home() {
  const api = useApi();
  const [categories, setCategories] = useState(null);

  // pagination states
  const [pageLength, setPageLength] = useState(6);
  const [pageStart, setPageStart] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    getCategoryPage(pageLength, pageStart);
  }, []);

  useEffect(() => {
    getCategoryPage(pageLength, pageStart);
  }, [pageLength, pageStart]);

  const getCategoryPage = (length, start) => {
    api
      .get("/public/categories/listMainCategories", {
        params: { length, start },
      })
      .then((result) => {
        //console.log('>> API RESULT', result)
        setCategories(result.data.data);
        setTotalPageCount(
          Math.ceil(parseInt(result.data.recordsTotal) / pageLength)
        );
      })
      .catch((err) => {
        console.error(">> API Hatası", err);
      });
  };

  let categoryArray = [];

  if (categories) {
    // kategori listesini componentlere ekle
    categories.map((item, index) => {
      categoryArray.push(
        <CategoryBox
          key={index}
          id={item.id}
          name={item.name}
          href={`#/category/${item.slug}`}
          image={item.image}
        />
      );
    });
  } else {
    // loading ekranı göster
    categoryArray.push(<Loading key="0" />);
  }

  const pageComponents = [];

  for (let i = 0; i < totalPageCount; i++) {
    pageComponents.push(
      <button
        key={i}
        onClick={() => setPageStart(i * pageLength)}
        className="btn btn-primary mx-2"
      >
        {i}
      </button>
    );
  }

  const lengthSelectComponents = [];
  for (let i = 0; i < 3; i++) {
    // 0, 1, 2

    lengthSelectComponents.push(
      <button
        key={i}
        onClick={() => setPageLength((i + 1) * 3)}
        className="btn btn-primary mx-2"
      >
        {(i + 1) * 3}
      </button>
    );
  }

  return (
    <main>
      <Pagination
        remoteUrl="/public/categories/listMainCategories"
        title="Categories"
      />

      <hr/>

      <Pagination
        remoteUrl="/public/categories/listMainCategories"
        title="Blogs"
      />
    </main>
  );
}

export default Home;
