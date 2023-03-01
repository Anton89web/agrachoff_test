import React, {useState} from 'react';
import "./Table.css"
import axios from "axios";

const Table = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState('OC47')
  const heroku = 'https://cors-anywhere.herokuapp.com/'
  const urlProduct = `${heroku}https://api.forum-auto.ru/v2/listGoods?art=${article}${process.env.REACT_APP_USER}`


  const fetchData = async(url) => {
    try {
      setData('')
      setLoading(true)
      const {data} = await axios.get(url);
      setData(data)
    } catch (error) {
      setLoading(false)
      alert(error);
    }
  }


  return (
    <div className="table__page">
      <h1>При получении данных с сервера происходит ошибка CORS</h1>
      <h3>Что бы получать данные нужно единожды воспользоваться ссылкой ниже</h3>
      <a className="table__link" href={heroku}>{heroku}</a>
      <div className="input__wrapper">
        <input className="table__input" placeholder="OC47" type="text" value={article} onChange={(e)=> setArticle(e.currentTarget.value)}/>
        <button className="btn table__btn" type='submit' onClick={()=> fetchData(urlProduct)}>Получить данные</button>
      </div>
      { data ? <table border="1">
        <caption>Таблица с данными по артиклю: {article}</caption>
        <thead>
        <tr>
          <th>ИД товара</th>
          <th>Название бренда</th>
          <th>Артикул</th>
          <th>Наименование товара</th>
          <th>Кол-во дней доставки</th>
          <th>Кол-во часов доставки</th>
          <th>Кратность товара</th>
          <th>Доступное кол-во товара</th>
          <th>Цена</th>
          <th>Склад</th>
          <th>Возможен ли возврат товара (0/1)</th>
        </tr>
        </thead>
        <tbody>
        {data.map(e=> (
          <tr key={e.gid}>
            <td>{e.gid}</td>
            <td>{e.brand}</td>
            <td>{e.art}</td>
            <td>{e.name}</td>
            <td>{e.d_deliv}</td>
            <td>{e.h_deliv}</td>
            <td>{e.kr}</td>
            <td>{e.num}</td>
            <td>{e.price}</td>
            <td>{e.whse}</td>
            <td>{e.is_returnable? "ДА" : "НЕТ"}</td>
          </tr>
        ))}
        </tbody>
      </table> : loading ?
        <img
          className="loading"
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"/> : null
      }
    </div>
  );
};

export default Table;
