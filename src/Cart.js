import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart(props) {
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>순서</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.cartnum + 1}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      props.dispatch({ type: "수량감소", 데이터: a.cartnum });
                    }}
                  >
                    -
                  </button>
                  &nbsp;
                  <button
                    onClick={() => {
                      props.dispatch({ type: "수량증가", 데이터: a.cartnum });
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alert열렸니 === true ? (
        <div className="my-alert2">
          <p>
            지금 구매하면 특가할인 20%
            <button
              className="cart-xbtn"
              onClick={() => {
                props.dispatch({ type: "alert닫기" });
              }}
            >
              X
            </button>
          </p>
        </div>
      ) : null}
      <Button
        variant="primary"
        size="lg"
        style={{ position: "relative", top: "130px" }}
        onClick={() => {
          alert("구매완료!");
        }}
      >
        즉시 구매하기
      </Button>
      &nbsp;
      <Button
        variant="primary"
        size="lg"
        style={{ position: "relative", top: "130px" }}
        as={Link}
        to="/"
      >
        계속 쇼핑하기
      </Button>
    </div>
  );
}

//리덕스 사용방법 props 처럼 만들어줌!
function stateToProps(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}

export default connect(stateToProps)(Cart);
// export default Cart;
