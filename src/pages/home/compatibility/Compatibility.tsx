import "./Compatibility.css";

export default function Compatibility() {
  return (
    <div className="compatibility">
      <span>지원 메일</span>
      <div>
        <img src={`${process.env.PUBLIC_URL}/gmail-logo.webp`} alt="" width={24} height={24} />
        Gmail
      </div>
      <div>
        <img src={`${process.env.PUBLIC_URL}/naver-logo.ico`} alt="" width={24} height={24} />
        Naver
      </div>
    </div>
  );
}
