# SnipText

## 고객지원 페이지

`/support`에 문의 폼을 제공합니다. 기존 페이지의 헤더·푸터와 글자 크기를 사용하며, 본문 폼은 최대 640px입니다.

온라인 접수를 활성화하려면 `.env.example`을 참고해 `.env.local`에 다음 값을 설정하고 개발 서버를 다시 시작하거나 다시 빌드합니다.

- `REACT_APP_TURNSTILE_SITE_KEY`: 서비스 도메인이 등록된 Cloudflare Turnstile 공개 사이트 키
- `REACT_APP_SUPPORT_ENDPOINT`: 문의를 접수하는 서버의 URL

현재 저장소에는 접수 서버가 없습니다. 설정이 없으면 접수 버튼을 비활성화하고 준비 중 안내를 표시합니다. 비밀 키를 `REACT_APP_` 환경변수에 넣지 않습니다.

서버는 multipart POST의 `email`, `category`, `message`, `consent`, `cf-turnstile-response`, 선택적인 `attachment`를 받습니다. 서버에서 필수 값과 이메일, 문의 유형, 내용 길이(최대 2,000자), 첨부파일 형식(PNG/JPEG/WebP/PDF)과 크기(최대 10MB)를 다시 검증해야 합니다. 실제 파일 형식도 확인하고 안전하게 보관해야 합니다.

서버의 Turnstile 비밀 키로 [Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)를 호출하고, 성공 여부와 서비스 hostname 및 action(`support`)을 검증한 뒤에만 문의를 저장하거나 전달합니다. 토큰은 일회용이며 5분 후 만료됩니다. 문의가 실제로 저장되거나 전달되었을 때만 HTTP 2xx와 JSON `{ "success": true }`를 반환합니다. 외부 도메인의 API라면 서비스 출처에 대한 CORS 설정도 필요합니다.

운영 전 개인정보 동의 문구의 보관 기간(현재 처리 완료 후 30일)과 실제 서버의 삭제 정책을 맞춰야 합니다. CAPTCHA와 전송은 실제 키 및 서버를 설정한 환경에서 별도로 확인해야 합니다.
