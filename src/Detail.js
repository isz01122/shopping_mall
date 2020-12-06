/* eslint-disable */
import React, { useEffect, useState } from 'react';
//useHistory라는 Hock을 사용하는 방법으로 뒤로가기를 구현
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

// 컴포넌트에 직접 스타일 넣어서 스타일링 하기!
// 클래스네임을 작성할 필요가 없음
let 박스 = styled.div`
    padding:20px;
`;

let 제목 = styled.h4`
    font-size:25px;
    color : ${ props => props.색상 }
`;

function Detail(props){

    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    // 훅! 업데이트마다 실행된다
    useEffect(()=>{
        let 타이머 = setTimeout(() => {
            alert변경(false)
        }, 2000);
        return ()=>{ clearTimeout(타이머) } //Detail컴포넌트가 사라질때 타이머를 제거한다
    },[]); //대괄호 안에 조건을 넣어줌


    // 라우터의 useParams훅! => 사용자가 입력한 URL파라미터들!
    // /:id자리에 사용자가 입력한 값이 들어감 
    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id;
    })
    // 방문기록을 담고있는 Object이다
    let history = useHistory();

    return (
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>

            {
                alert === true 
                ? (<div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다.</p>
                </div>) : null
            }
            
            <div className="row">
                <div className="col-md-6">
                    <img src={ 'https://codingapple1.github.io/shop/shoes' + (찾은상품.id+1) +'.jpg' } width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    
                    <Info 재고={props.재고}></Info>

                    <button className="btn btn-danger" onClick={()=>{
                        props.재고변경([9,10,11]);
                    }}>주문하기</button>
                    &nbsp; 
                    <button className="btn btn-danger" onClick={()=>{
                        history.goBack();
                    }}>뒤로가기</button> 
                </div>
            </div>
        </div> 
    )
}

function Info(props){
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

export default Detail;