import React, { useEffect, useState } from "react";
import { getTodos } from "../api.rest";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOption, setFilterOption] = useState({});

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      setTodos(response);
      setFilterTodos(response);
      const userID = [...new Set(response.map((res) => res.userId))];
      const completed = [...new Set(response.map((res) => res.completed))];
      setFilterOption({ id: userID, completed });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFilterData = (key, value,arr) => {
    const compareValue = key === "userId" ? Number(value) : value === "true" ? true : false 
     return arr.filter(item => item[key] === compareValue)
  }
 
  const handleFilterData = (key, value) => {
    const arr = [...todos];
    const data = value === "all" ? arr : getFilterData(key, value, arr) ;
    setFilterTodos(data);
  };

  const handleFilterDataByTitle = (value) => {
    const data = [...todos].filter(item => item.title.includes(value))
    setFilterTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="table-container">
            <div className="filters">

            <div className="filter-container">
                <label>Total Count :</label>
                 <span>{todos.length}</span>
              </div>


              <div className="filter-container">
                <label>User Id :</label>
                <select onChange={(e) => handleFilterData('userId',e.target.value)}>
                  <option value="all">All</option>
                  {filterOption?.id?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-container">
                <label>Completed :</label>
                <select onChange={(e) => handleFilterData("completed", e.target.value)}>
                  <option value="all">All</option>
                  {filterOption?.completed?.map((item) => (
                    <option key={item} value={item}>
                      { item ? "true": "false"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-container">
                <label>Title :</label>
                <input type="text" onChange={(e) => handleFilterDataByTitle(e.target.value)}/>
              </div>

              <div className="filter-container">
                <label>Table Count :</label>
                 <span>{filterTodos.length}</span>
              </div>
            </div>

            {filterTodos.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>User Id</th>
                      <th>title</th>
                      <th>Completed</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterTodos.map(({ id, userId, title, completed }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{userId}</td>
                        <td>{title}</td>
                        <td>{completed ? "True" : "False"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <h1>No Data available</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
