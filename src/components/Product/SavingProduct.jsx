import Numeral from "numeral";
import {
  Guide,
  Info,
  Message,
  Name,
  Prdt_nm,
  ProductBox,
  TotalCost,
  Wrapper,
  Scrap,
  Logo,
} from "./style";
import Bookmarks from "../Bookmarks";
import logoLists from "../../assets/logo/logo";

function SavingProduct({
  inputValue,
  selectedProduct,
  selectedProductId,
  selectedProductRate,
  selectedProductRate2,
  // seletedProductRateType,
}) {
  //* props로 받아온 문자열 input값 숫자형으로 바꾸기
  //TODO: 입력할때마다 리렌더링
  const inputNum = parseInt(inputValue.replaceAll(",", ""));

  return (
    <Wrapper>
      <Guide>만기 수령액</Guide>
      {inputNum > 9999 ? (
        // TODO: 단복리 검사해야함 !! 아래는 임시
        // selectedProductRateType === "S" ? (
        selectedProductRate ? (
          <TotalCost>
            {Numeral(
              inputNum * 12 +
                Math.round(
                  inputNum *
                    ((((12 * 13) / 2) * (Number(selectedProductRate) * 0.01)) /
                      12)
                ) -
                Math.round(
                  inputNum *
                    ((((12 * 13) / 2) * (Number(selectedProductRate) * 0.01)) /
                      12) *
                    0.154
                )
            ).format(0, 0)}
            원
          </TotalCost>
        ) : (
          <TotalCost>
            {Numeral(
              Math.round(
                (inputNum *
                  (Math.pow(
                    1 +
                      (0.01 *
                        Math.round(
                          (inputNum *
                            (Math.pow(
                              1 + (0.01 * Number(selectedProductRate2)) / 12,
                              12
                            ) -
                              1)) /
                            ((0.01 * Number(selectedProductRate2)) / 12)
                        )) /
                        12,
                    12
                  ) -
                    1)) /
                  ((0.01 * Number(selectedProductRate2)) / 12)
              )
            ).format(0, 0)}
            원
          </TotalCost>
        )
      ) : (
        <TotalCost style={{ color: "#A3A3A3" }}>0원</TotalCost>
      )}

      <ProductBox>
        <Name>
          {logoLists.logos.map((t) =>
            Object.keys(t)[0] === selectedProduct.fin_co_no ? (
              <Logo
                src={Object.values(t)[0]}
                alt="로고"
                key={selectedProduct.id}
              />
            ) : null
          )}
          <Prdt_nm>{selectedProduct.fin_prdt_nm}</Prdt_nm>
        </Name>

        <Info>
          <div>{selectedProduct.kor_co_nm}</div>
          <div>
            일반 금리 {selectedProductRate}% | 최고금리
            {selectedProductRate2}
          </div>
          <div>
            {selectedProduct.etc_note.split("-").map((line) => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
          </div>
        </Info>
        <Message>
          <li>가입 방법: {selectedProduct.join_way}</li>
          <li>가입 대상: {selectedProduct.join_member}</li>
        </Message>
        <Scrap>
          <Bookmarks
            productId={selectedProduct.fin_prdt_cd}
            productName={selectedProduct.fin_prdt_nm}
            productCoName={selectedProduct.kor_co_nm}
            productDocId={selectedProductId}
            productCoCode={selectedProductId.fin_co_no}
          />
        </Scrap>
      </ProductBox>
    </Wrapper>
  );
}

export default SavingProduct;
