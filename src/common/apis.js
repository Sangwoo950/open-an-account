import axios from "axios";

//http만들었음
// const MY_ADDRESS = "6f3a6ea55869e0bdccf38e3e5dcc145e";

export const fetchUrl = async () => {
  const { data } = await axios.get(
    `https://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=6f3a6ea55869e0bdccf38e3e5dcc145e&topFinGrpNo=020000&pageNo=1`
  );
  return data.json();
};
export const DEPOSIT_URL =
  "/finlifeapi/depositProductsSearch.json?auth=bfb2f61f47f5d5cd497ffefc94274829&topFinGrpNo=020000&pageNo=1";

//적금정보 불러오는 함수
export const FetchSavingLists = async () => {
  const { data } = await axios.get(
    ` https://cors-anywhere.herokuapp.com/https://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=6f3a6ea55869e0bdccf38e3e5dcc145e&topFinGrpNo=020000&pageNo=1`
  );
  return data;
};

//예금정보 불러오는 함수
export const FetchLists = async () => {
  const { data } = await axios.get(
    ` https://cors-anywhere.herokuapp.com/https://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=6f3a6ea55869e0bdccf38e3e5dcc145e&topFinGrpNo=020000&pageNo=1`
  );
  return data;
};
