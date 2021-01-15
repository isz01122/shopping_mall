/* eslint-disable */
import React, { useEffect, useState } from "react";
//useHistory라는 Hock을 사용하는 방법으로 뒤로가기를 구현
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import styled from "styled-components";
import "./Detail.scss";

// 컴포넌트에 직접 스타일 넣어서 스타일링 하기!
// 클래스네임을 작성할 필요가 없음
let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  // 훅! 업데이트마다 실행된다
  useEffect(() => {
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    }; //Detail컴포넌트가 사라질때 타이머를 제거한다
  }, []); //대괄호 안에 조건을 넣어줌

  // 라우터의 useParams훅! => 사용자가 입력한 URL파라미터들!
  // /:id자리에 사용자가 입력한 값이 들어감
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });
  // 방문기록을 담고있는 Object이다
  let history = useHistory();

  function 재고감소(id) {
    let arr = [...props.재고];
    arr[id] = parseInt(arr[id]) - 1;
    props.재고변경(arr);
  }

  return (
    <div className="container">
      <박스>
        <제목 className="red">Detail</제목>
      </박스>

      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://raw.githubusercontent.com/isz01122/shopping_mall/master/shop/shoes" +
              (찾은상품.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고} 찾은상품={찾은상품}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              재고감소(찾은상품.id);
              props.dispatch({
                type: "항목추가",
                payload: {
                  id: 찾은상품.id,
                  name: 찾은상품.title,
                  quan: 1,
                  cartnum: undefined,
                },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
          <br />
          <br />
          <br />
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
              스위치변경(false);
            }}
          >
            상품설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1);
              스위치변경(false);
            }}
          >
            배송정보
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return (
      <div>
        <br />
        <p>상품을 소개하는 페이지 입니다.</p>
        <br />
      </div>
    );
  } else if (props.누른탭 === 1) {
    return (
      <div>
        <br />
        <p>배송정보에 관한 페이지 입니다.</p>
        <br />
      </div>
    );
  }
}

function Info(props) {
  return <p>재고 : {props.재고[props.찾은상품.id]}</p>;
}

//리덕스 사용방법 props 처럼 만들어줌!
function stateToProps(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}

export default connect(stateToProps)(Detail);
// export default Detail;
