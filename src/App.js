/* eslint-disable */
// CSS에 많은 시간을 들이지 말고 부트스트랩을 이용하여 시간을 단축
// 컴포넌트들을 사용하기 위해서는 꼭 임포트를 해준다
import logo from "./logo.svg";
import React, { useContext, useState } from "react";
import { Navbar, Nav, Button, Jumbotron, Spinner } from "react-bootstrap";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Data from "./data.js";
import Detail from "./Detail.js";
import axios from "axios";
import Cart from "./Cart.js";

let 재고context = React.createContext();

function App() {
  // 데이터가 너무 길 경우 새로운 파일을 만들어서 임포트해서 가져온다
  let [shoes, shoes변경] = useState(Data);
  let [isLoading, isLoading변경] = useState(false);
  let [재고, 재고변경] = useState([10, 11, 12, 13, 14, 15]);
  let [더보기, 더보기변경] = useState(true);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          신발SHOP
        </Navbar.Brand>
        <Nav.Link as={Link} to="/cart">
          장바구니
        </Nav.Link>
      </Navbar>

      {/* 중복 발생시 맨 위의 라우터만 나타내기 위해 스위치 사용 */}
      {/* exact를 사용하면 "/"(슬래시)기호 한대만 있을때만 나타낸다 */}
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>50% Season Off</h1>
            <p>
              This is a simple page, React JS Fundamentals Shopping Mall 2020.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          {/* 좌우 여백을 잡아줌 */}
          {/* 부트스트랩 문법 "row" => 12개의 세로줄로 나눠줌 */}
          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {
                  // 컴포넌트화 시켜 반복문을 사용한다
                  shoes.map((shoe, i) => {
                    return <Card shoes={shoes[i]} key={i} i={i} />;
                  })
                }
              </div>
            </재고context.Provider>
            <div>
              <br />
              <br />
              {더보기 === true ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    isLoading변경(true);
                    axios
                      .get(
                        "https://raw.githubusercontent.com/isz01122/shopping_mall/master/shop/data2.json"
                      )
                      .then((result) => {
                        setTimeout(() => {
                          shoes변경([...shoes, ...result.data]);
                          isLoading변경(false);
                          더보기변경(false);
                        }, 500);
                      })
                      .catch(() => {
                        isLoading변경(false);
                        console.log("fail");
                      });
                  }}
                >
                  더보기
                </button>
              ) : null}
              <br />
              <br />
              {isLoading === true ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : null}
              <br />
              <br />
              <br />
            </div>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        {/* 모든 문자열을 의미함 */}
        <Route path="/:id">
          <div>아무거나 적었을때 나타나는 페이지</div>
        </Route>
      </Switch>
    </div>
  );
}

{
  /* 4개씩 차지하여 총합 12컬럼을 차지하는방법 => 즉, 3등분 */
}
{
  /* "md" => 모바일에서는 세로로 나타내줌 */
}
function Card(props) {
  let 재고 = useContext(재고context);
  let history = useHistory();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoes.id);
      }}
    >
      <img
        src={
          "https://raw.githubusercontent.com/isz01122/shopping_mall/master/shop/shoes" +
          (props.i + 1) +
          ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}

export default App;
