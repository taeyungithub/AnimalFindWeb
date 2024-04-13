import * as S from "../../../styles/boardsNew";
import {useState} from 'react'
import {useRouter} from'next/router'
import { firebaseApp } from "../../../src/firebase";
import{getFirestore, doc, setDoc } from'firebase/firestore/lite'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { myname, myuid } from "../../../src/stores";
import {useRecoilState} from 'recoil'



export default function BoardsNewPage() {
  //recoil 이용 uid와 닉네임 가져오기
  const [userid, setUserid] = useRecoilState(myuid)
  const [username, setUsername] = useRecoilState(myname)

  const router = useRouter()

  // 제목 비밀번호 작성자 내용 다쓰면 등록하기 button ON
  const [isActive, setIsActive] = useState(false);
  // 주소입력창 띄우기위해 필요
  const [isOpen, setIsOpen] = useState(false);

  const [writer, setWriter] = useState(username);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [fileUrl1,setfileUrl1] = useState("")
  const [fileUrl2,setfileUrl2] = useState("")
  const [fileUrl3,setfileUrl3] = useState("")

// button ON
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (
      event.target.value !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }

    if (
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeAddressDetail = (event) => {
    setAddressDetail(event.target.value);
  };

  const onClickAddressSearch = () => {
    setIsOpen((prev) => !prev);
  };

  const onCompleteAddressSearch = (data)=> {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen((prev) => !prev);
  };



  const onFileChange1 = async(event) =>{
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage,`${userid+random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl1(file_url)
  
  }

  const onFileChange2 = async(event) =>{
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage,`${userid+random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl2(file_url)
  
  }

  const onFileChange3 = async(event) =>{
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage,`${userid+random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl3(file_url)
  
  }


  const random = Math.random()
  const options = { timeZone: 'Asia/Seoul' };
  const currentDate = String(new Date().toLocaleDateString('ko-KR', options));

  const onClickSubmit = async() => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
     
     if (writer && title && contents){
      alert("게시글이 등록되었습니다.");
      try{
        //서류봉투 중에서 board 봉투 가져오기
      await setDoc(doc(getFirestore(firebaseApp), "board", `${userid+random}`), {
           writer:writer,
           title:title,
           contents:contents,
           _id: userid+random,
           createdAt:currentDate,
           timestamp: new Date(),
            zipcode:zipcode,
            address:address,
            addressDetail:addressDetail,
            fileUrl1:fileUrl1,
            fileUrl2:fileUrl2,
            fileUrl3:fileUrl3
          });
        
       router.push(`/boards/${userid+random}`)

      }catch(error){
        alert(error.message)
       }
      } 

  };

  return (
<>
    {isOpen && (
      <S.AddressModal visible={true}>
        <S.AddressSearchInput onComplete={onCompleteAddressSearch} />
      </S.AddressModal>
    )}

    <S.Wrapper>
      <S.Title>게시글 등록</S.Title>
      <S.WriterWrapper>
        <S.InputWrapper>
          <S.Label>작성자</S.Label>
          <S.Writer type="text" value={username} readOnly/>
          <S.Error>{writerError}</S.Error>
        </S.InputWrapper>
        
      </S.WriterWrapper>
      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject type="text" placeholder="제목을 작성해주세요." onChange={onChangeTitle} />
          <S.Error>{titleError}</S.Error>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.Contents placeholder="내용을 작성해주세요." onChange={onChangeContents} />
        <S.Error>{contentsError}</S.Error>
      </S.InputWrapper>

      
      <S.InputWrapper>
          <S.Label>주소</S.Label>
          <S.ZipcodeWrapper>
            <S.Zipcode
              placeholder="도로명주소"
              readOnly
              value={ zipcode }
            />
            <S.SearchButton onClick={onClickAddressSearch}>
              우편번호 검색
            </S.SearchButton>
          </S.ZipcodeWrapper>
          <S.Address
            readOnly
            value={ address  }
          />
          <S.Address
            onChange={onChangeAddressDetail}
          />
        </S.InputWrapper>
        
      
      <S.ImageWrapper>
        <S.Label>사진첨부</S.Label>
        {/* <S.UploadButton>+</S.UploadButton> */}
        <input type="file" onChange={onFileChange1}/>
        {/* <S.UploadButton>+</S.UploadButton> */}
        <input type="file" onChange={onFileChange2}/>
        {/* <S.UploadButton>+</S.UploadButton> */}
        <input type="file" onChange={onFileChange3}/>
      </S.ImageWrapper>
      
      <S.ButtonWrapper>
        <S.SubmitButton onClick={onClickSubmit} isActive={isActive} disabled={!isActive}>등록하기</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
    </>
  );
}
