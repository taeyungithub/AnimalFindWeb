import * as S from "../../../styles/boardsNew";
import {useState} from 'react'
import {useRouter} from'next/router'
import { firebaseApp } from "../../../src/firebase";
import{collection, addDoc, getDocs, getFirestore, query} from'firebase/firestore/lite'
import { doc, setDoc } from "firebase/firestore/lite";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";



export default function BoardsNewPage() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const router = useRouter()

  const [fileUrl1,setfileUrl1] = useState("")
  const [fileUrl2,setfileUrl2] = useState("")
  const [fileUrl3,setfileUrl3] = useState("")





 
  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }

    if (
      event.target.value !== "" &&
      password !== "" &&
      title !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event)=> {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }

    if (
      writer !== "" &&
      event.target.value !== "" &&
      title !== "" &&
      contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (
      writer !== "" &&
      password !== "" &&
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
      writer !== "" &&
      password !== "" &&
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
      ref(storage,`${random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    setfileUrl1(file_url)
  
  }

  const onFileChange2 = async(event) =>{
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage,`${random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    setfileUrl2(file_url)
  
  }

  const onFileChange3 = async(event) =>{
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage,`${random}/${event.target.files[0].name}`
      ),event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    setfileUrl3(file_url)
  
  }









  const random = Math.random()
  const options = { timeZone: 'Asia/Seoul' };
  const currentDate = String(new Date().toLocaleDateString('ko-KR', options));

  const onClickSubmit = async() => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
     
     if (writer && password && title && contents){
      alert("게시글이 등록되었습니다.");
      try{
        //서류봉투 중에서 board 봉투 가져오기
      
     
    


      await setDoc(doc(getFirestore(firebaseApp), "board", `${random}`), {
           writer:writer,
           title:title,
           contents:contents,
           _id: random,
           createdAt:currentDate,
           timestamp: new Date(),
            zipcode:zipcode,
            address:address,
            addressDetail:addressDetail,
            fileUrl1:fileUrl1,
            fileUrl2:fileUrl2,
            fileUrl3:fileUrl3
          });
        



      //  const result = await getDocs(board)
      //  const datas = result.docs.map(el => el.data())
      //  const address = datas[0]._id
        
       router.push(`/boards/${random}`)



      
      }catch(error){
        alert(error.message)
       }
      } 
       

  };

  // const onClickFetch = async () => {
  //   const board =  collection(getFirestore(firebaseApp),"board")
  //   const result = await getDocs(board)
  //   const datas = result.docs.map(el => el.data())
  //   console.log(datas[0].title)
  // }

// // 이미지 업로드
// const onChangeUploadFB = async(event)=>{
//   console.log(event.target.files[0]);

//   const uploaded_file = await uploadBytes(
//     ref(getStorage(firebaseApp),`images/${event.target.files[0].name}`
//   //전 업로드 할 파일의 이름을 각 파일 이름으로 저장되게 했어요!
//     ),event.target.files[0]
//    );
//    const file_url = await getDownloadURL(uploaded_file.ref);
//    console.log(file_url);
//    file_link_ref.current = {url: file_url};


//   }


// const onFileChange = (event) =>{
//   console.log(event.target.files)
//   const{
//     target:{files}
//   }=event;
//   const theFile = files[0]
//   const reader = new FileReader()
// reader.onloadend = (finishedEvent)=>{
//   console.log(finishedEvent);
//   const{
//     currentTarget:{result},
//   }= finishedEvent;
//   setAttachment(result)

// }

//   reader.readAsDataURL(theFile)
// }










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
          <S.Writer type="text" placeholder="이름을 적어주세요." onChange={onChangeWriter} />
          <S.Error>{writerError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>비밀번호</S.Label>
          <S.Password type="password" placeholder="비밀번호를 작성해주세요." onChange={onChangePassword} />
          <S.Error>{passwordError}</S.Error>
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
              placeholder="07250"
              readOnly
              value={ zipcode  }
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
