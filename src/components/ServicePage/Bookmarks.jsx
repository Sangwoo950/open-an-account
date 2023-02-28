import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService, db } from "../../config/firebase";

const Bookmarks = ({ baseList }) => {
  const [bookmark, setBookmark] = useState(false);
  const currentUserUid = authService.currentUser?.uid;
  const navigate = useNavigate();

  // 북마크 추가 및 삭제
  const handleBookmarkChange = async () => {
    // 로그인 체크
    if (!authService.currentUser) {
      if (
        window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
      ) {
        return navigate("/login");
      } else {
        return;
      }
    }
    // newId: 해당하는 필드값을 내가 새로 만들어줌 (setDoc)
    // const newId = currentUserUid + baseList.id;
    // 북마크가 체크되어있지 않다면?
    if (!bookmark) {
      // 여기서 아까 지정해준 newId로 새로운 필드값을 정해준 다음 그 안에 속성들은 userId ~~~ 등등 애들이 들어갈 예정.
      await setDoc(doc(db, "bookmarks", baseList.id), {
        userId: currentUserUid,
        // 필드 id
        docId: baseList.id,
        // base list
        fin_prdt_nm: baseList.fin_prdt_nm, // 상품 명
        fin_prdt_cd: baseList.fin_prdt_cd, // 상품 코드
        kor_co_nm: baseList.kor_co_nm, // 상품 회사 명
        join_way: baseList.join_way, // 가입 방법
        max_limit: baseList.max_limit, // 최고 한도
        join_member: baseList.join_member, // 가입 대상
        etc_note: baseList.etc_note, // 기타 유의사항
        fin_co_no: baseList.fin_co_no, // 상품 회사 코드
      });

      // true가 되면서 북마크 더이상 못하게 막기
      setBookmark(true);
    } else {
      // bookmark 면? 해당 newId 가 있으니 delete 이 실행
      const haveBookMark = doc(db, "bookmarks", baseList.id);
      deleteDoc(haveBookMark);
      //다시 북마크가 저장가능한 상태
      setBookmark(false);
    }
  };

  // 내가 북마크한 내역 화면에 출력
  const getBookmark = async () => {
    // const newId = currentUserUid + baseList.id;
    const docRef = doc(db, "bookmarks", baseList.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBookmark(true);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <Bookmarked onClick={handleBookmarkChange}>
      {bookmark ? (
        <BookmarkedImg src={require("../../assets/bookmarked.png")} />
      ) : (
        <BookmarkedImg src={require("../../assets/bookmarked-empty.png")} />
      )}
    </Bookmarked>
  );
};
export default Bookmarks;

// const StyledBookmarkFill = styled(BsFillBookmarkFill)`
//   width: 20px;
//   height: 27px;
//   color: #6a24ff;
// `;
// const StyledBookmark = styled(BsBookmark)`
//   width: 20px;
//   height: 27px;
//   color: #6a24ff;
// `;

const Bookmarked = styled.div`
  width: 20px;
  height: 25px;
`;
const BookmarkedImg = styled.img`
  width: 100%;
`;
